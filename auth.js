const API_BASE_URL = window.CAREERCONNECT_API_URL || "https://YOUR-RENDER-SERVICE.onrender.com";
const form=document.getElementById("authForm");
const title=document.getElementById("formTitle");
const subtitle=document.getElementById("formSubtitle");
const passwordGroup=document.getElementById("passwordGroup");
const confirmGroup=document.getElementById("confirmGroup");
const password=document.getElementById("password");
const confirmPassword=document.getElementById("confirmPassword");
const switchLine=document.getElementById("switchLine");
const submitBtn=document.getElementById("submitBtn");
const forgotLink=document.getElementById("forgotLink");
const toast=document.getElementById("authToast");
let mode="login";
function notify(message,error=false){toast.textContent=message;toast.classList.toggle("error",error);toast.classList.add("show");clearTimeout(notify.timer);notify.timer=setTimeout(()=>toast.classList.remove("show"),3500)}
function setMode(next){
 mode=next;form.reset();password.type="password";
 passwordGroup.classList.toggle("hidden",mode==="forgot");
 confirmGroup.classList.toggle("hidden",mode!=="signup");
 password.required=mode!=="forgot";confirmPassword.required=mode==="signup";
 if(mode==="login"){title.textContent="Login";subtitle.textContent="Welcome back. Enter your details to continue.";submitBtn.textContent="Login";switchLine.innerHTML='Don\'t have an account? <button type="button" id="signupLink">Sign up</button>';forgotLink.classList.remove("hidden");}
 if(mode==="signup"){title.textContent="Create account";subtitle.textContent="Create your account and discover opportunities made for you.";submitBtn.textContent="Create account";switchLine.innerHTML='Already have an account? <button type="button" id="loginLink">Login</button>';forgotLink.classList.add("hidden");}
 if(mode==="forgot"){title.textContent="Reset password";subtitle.textContent="Enter your email and we will send a password reset link.";submitBtn.textContent="Send reset link";switchLine.innerHTML='Remembered your password? <button type="button" id="loginLink">Login</button>';forgotLink.classList.add("hidden");}
}
document.addEventListener("click",e=>{if(e.target.id==="signupLink")setMode("signup");if(e.target.id==="loginLink")setMode("login")});
forgotLink.addEventListener("click",()=>setMode("forgot"));
document.getElementById("togglePassword").addEventListener("click",()=>{password.type=password.type==="password"?"text":"password";});
form.addEventListener("submit",async e=>{
 e.preventDefault();
 if(mode==="signup"&&password.value!==confirmPassword.value){notify("Passwords do not match.",true);return;}
 const email=document.getElementById("email").value.trim();
 const payload={email};
 if(mode!=="forgot")payload.password=password.value;
 if(mode==="signup")payload.name=email.split("@")[0];
 const endpoint=mode==="signup"?"/api/auth/register":mode==="forgot"?"/api/auth/forgot-password":"/api/auth/login";
 submitBtn.disabled=true;const original=submitBtn.textContent;submitBtn.textContent="Please wait...";
 try{
  if(API_BASE_URL.includes("YOUR-RENDER-SERVICE"))throw new Error("Backend is not connected yet. Deploy the backend on Render and set its URL in auth.js.");
  const response=await fetch(API_BASE_URL+endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  const data=await response.json().catch(()=>({message:"Unexpected server response."}));
  if(!response.ok)throw new Error(data.message||"Request failed.");
  if(mode==="forgot"){notify(data.message||"If the account exists, a reset email will be sent.");setMode("login");return;}
  localStorage.setItem("careerconnect_token",data.token);
  localStorage.setItem("careerconnect_user",JSON.stringify(data.user));
  notify(mode==="signup"?"Account created. You are now signed in.":"Login successful. Welcome back!");
  setTimeout(()=>{window.location.href="index.html";},900);
 }catch(error){notify(error.message||"Unable to connect to the server.",true);}
 finally{submitBtn.disabled=false;submitBtn.textContent=original;}
});
const params=new URLSearchParams(location.search);
if(params.has("resetToken")){setMode("reset");}
