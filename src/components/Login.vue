<template>
    <div class="center">
	<h1>Log In</h1>
		<form>
			<div class="text_field">
				<input type="text" v-model="username" required>
				<label>Username</label>
			</div>
			<div class="text_field">
				<input type="password" v-model="password" required>
				<label>Password</label>
			</div>
			<button v-on:click="logIn">Login</button>
		</form>
	</div>
</template>

<script>
import UsersDataService from "@/services/UsersDataService";

export default{
    
    name: 'login-page',
    data()
    {
        return{
            users: [],
            username:'',
            password:'',
            loggedIn: false
        }
    },
    methods:{
        logIn(){
            var userl = this.users
            let i = 0
            for(i = 0; i < userl.length; i++){
                if(userl[i].username == this.username && userl[i].password == this.password) {
                    this.loggedIn = true 
                    break   
                }
            }
            if(!this.loggedIn){
                alert('Your username and/or password are incorrect. Try again')
            }
            else{
                localStorage.setItem('username', userl[i].username)
                localStorage.setItem('isLoggedIn', 'true')
                this.$router.go({path: '/'})
            }

        },
        retrieveUsers(){
            UsersDataService.getAll()
            .then(response => {
                this.users = response.data
            })
            .catch(e => {
                alert(e)
            })
        }
    },
    mounted(){
        this.retrieveUsers()
    }
}

</script>

<style scoped>
body{
    margin: 0;
	padding: 0;
	background: linear-gradient(120deg, rgba(228, 205, 76), #68e1e2);
	height: 100vh;
	overflow: hidden;
}
.center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0,05);
}
.center h1{
	text-align: center;
	padding: 20px 0;
	border-bottom: 1px solid silver;
}
.center form{
	padding: 30px 40px;
	box-sizing: border-box;
}
form .text_field{
	position: relative;
	border-bottom: 2px solid #adadad;
	margin: 30px 0;
}
.text_field input{
	width: 100%;
	padding: 0 5px;
	height: 40px;
	font-size: 16px;
	border: none;
	background: none;
	outline: none;
}
.text_field label{
	position: absolute;
	top: 50%;
	left: 5px;
	color: #adadad;
	transform: translateY(-50%);
	font-size: 16px;
	pointer-events: none;
	transition: .5s;
}
.text_field span::before{
	content: '';
	position: absolute;
	top: 40px;
	left: 0;
	width: 0%;
	height: 2px;
	background: #bef2f2;
	transition: .5s;
}
.text_field input:focus ~ label,
.text_field input:valid ~ label{
	top: 5px;
	color: #bef2f2;
}
.text_field input:focus ~ span::before,
.text_field input:valid ~ span::before{
	width: 100%;
}
.pass{
	margin: -5px 0 20px 5px;
	color: #A6A6A6;
	cursor: pointer;
}
.pass:hover{
	text-decoration: underline;
}
button{
	width: 100%;
	height: 50px;
	border: 1px solid;
	background: rgba(228, 205, 76);
	border-radius: 25px;
	font-size: 18px;
	color: aliceblue;
	font-weight: 700;
	cursor: pointer;
	outline: none;
}
input[type="button"]:hover{
	border-color: rgba(228, 199, 76);
	transition: .5s;
}
</style>