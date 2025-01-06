from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import OuterRef, Subquery
from django.db.models import Q
from django.views.decorators.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


from api.models import User, Todo, Profile, ChatMessage
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, TodoSerializer, MessageSerializer, ProfileSerializer,UserSerializer, QuestionSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from .mistral_client import get_mistral_client


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


class TodoListView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        todo = Todo.objects.filter(user=user) 
        return todo
    

class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        todo_id = self.kwargs['todo_id']

        user = User.objects.get(id=user_id)
        todo = Todo.objects.get(id=todo_id, user=user)

        return todo
    

class TodoMarkAsCompleted(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        todo_id = self.kwargs['todo_id']

        user = User.objects.get(id=user_id)
        todo = Todo.objects.get(id=todo_id, user=user)

        todo.completed = True
        todo.save()

        return todo


# Chat APp
class MyInbox(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']

        messages = ChatMessage.objects.filter(
            id__in =  Subquery(
                User.objects.filter(
                    Q(sender__reciever=user_id) |
                    Q(reciever__sender=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef('id'),reciever=user_id) |
                            Q(reciever=OuterRef('id'),sender=user_id)
                        ).order_by('-id')[:1].values_list('id',flat=True) 
                    )
                ).values_list('last_msg', flat=True).order_by("-id")
            )
        ).order_by("-id")
            
        return messages
    
class GetMessages(generics.ListAPIView):
    serializer_class = MessageSerializer
    
    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        reciever_id = self.kwargs['reciever_id']
        messages =  ChatMessage.objects.filter(sender__in=[sender_id, reciever_id], reciever__in=[sender_id, reciever_id])
        return messages

class SendMessages(generics.CreateAPIView):
    serializer_class = MessageSerializer

class AskMistralView(generics.CreateAPIView):
    serializer_class = QuestionSerializer  # Définition de la classe de serializer

    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        client = get_mistral_client()
        model = "mistral-large-latest"
        
        # Utilisation d'un serializer pour valider les données entrantes
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.validated_data.get('question')
            mode = serializer.validated_data.get('mode')

            

            


            prompt_engineering = "En tant que IA JobBot, vous êtes un examinateur d'entretien d'embauche spécialisé dans la reconversion de personnes en provenance de l'armée. Vous devez vous adresser au candidat en mode role play et adapter votre niveau de difficulté en fonction du mode sélectionné : passif, neutre ou agressif. Vous devez poser UNE question pertinente MAXIMUM a chaque fois, NE PAS FAIRE DES REPONSES TROP LONGUES. Tu dois évaluer les réponses des candidats en fonction de leur précision, leur clarté et leur pertinence. Mode passif : 1. Pouvez-vous décrire votre expérience dans l'armée et la manière dont vous pensez qu'elle pourrait être utile dans le monde du travail ? 2. Pouvez-vous expliquer ce qui vous a motivé à quitter l'armée et à chercher un nouvel emploi ? 3. Pouvez-vous décrire votre niveau de confort avec les technologies de l'information et de la communication couramment utilisées dans le monde du travail ? Mode neutre : 1. Pouvez-vous décrire votre expérience en matière de leadership et de gestion d'équipe dans l'armée et la manière dont vous pensez qu'elle pourrait être appliquée dans un contexte professionnel ? 2. Pouvez-vous expliquer comment vous gérez le stress et les situations de crise, et comment vous pensez que cela pourrait être utile dans un nouvel emploi ? 3. Pouvez-vous décrire votre expérience en matière de planification et d'organisation, et la manière dont vous pensez qu'elle pourrait être appliquée dans un nouvel emploi ? Mode agressif : 1. Pouvez-vous décrire votre expérience en matière de prise de décision sous pression et la manière dont vous pensez qu'elle pourrait être appliquée dans un nouvel emploi ? 2. Pouvez-vous expliquer comment vous gérez les conflits et les différends, et comment vous pensez que cela pourrait être utile dans un nouvel emploi ? 3. Pouvez-vous décrire votre expérience en matière de gestion de projets et de suivi des résultats, et la manière dont vous pensez qu'elle pourrait être appliquée dans un nouvel emploi ? En tant que IA JobBot, vous devez également être capable d'évaluer les réponses des candidats en fonction de leur niveau de détail, de leur précision et de leur pertinence. Vous devez être capable de fournir des commentaires constructifs et des suggestions damélioration pour aider les candidats à saméliorer. Tu poses 1 question maximum par réponse.Tu ne cite pas le mode c'est l user qui le précise. Tu dois faire des réponses courte et conscice efficace. Si le sujet nest pas en rapport avec les consignes tu dois dire que tu es JobBot un assisant virtuel examinateur en entretient d embauche et que tu nes pas la pour parler hors de ce sujet la."
            messages = [{"role": "system", "content": prompt_engineering}, {"role": "system", "content": f"difficulté: {mode}"}, {"role": "user", "content": question}]
            
            

            
            try:
                chat_response = client.chat(model=model, messages=messages)
                answer = chat_response.choices[0].message.content
                return JsonResponse({"answer": answer})
            except Exception as e:
                return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]  


class SearchUser(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]  

    def list(self, request, *args, **kwargs):
        username = self.kwargs['username']
        logged_in_user = self.request.user
        users = Profile.objects.filter(Q(user__username__icontains=username) | Q(full_name__icontains=username) | Q(user__email__icontains=username) & 
                                       ~Q(user=logged_in_user))

        if not users.exists():
            return Response(
                {"detail": "No users found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    


def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})



