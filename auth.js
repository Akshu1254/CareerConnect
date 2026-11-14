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
function notify(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2800)}
function setMode(next){
 mode=next;form.reset();password.type="password";
 passwordGroup.classList.toggle("hidden",mode==="forgot");
 confirmGroup.classList.toggle("hidden",mode!=="signup");
 document.getElementById("password").required=mode!=="forgot";
 confirmPassword.required=mode==="signup";
 if(mode==="login"){title.textContent="Login";subtitle.textContent="Welcome back. Enter your details to continue.";submitBtn.textContent="Login";switchLine.innerHTML='Don\'t have an account? <button type="button" id="signupLink">SignUp</button>';forgotLink.classList.remove("hidden");}
 if(mode==="signup"){title.textContent="Create Account";subtitle.textContent="Sign up to discover opportunities made for you.";submitBtn.textContent="SignUp";switchLine.innerHTML='Already have an account? <button type="button" id="loginLink">Login</button>';forgotLink.classList.add("hidden");}
 if(mode==="forgot"){title.textContent="Reset Password";subtitle.textContent="Enter your email and we will help you reset your password.";submitBtn.textContent="Send reset link";switchLine.innerHTML='Remembered your password? <button type="button" id="loginLink">Login</button>';forgotLink.classList.add("hidden");}
}
document.addEventListener("click",e=>{if(e.target.id==="signupLink")setMode("signup");if(e.target.id==="loginLink")setMode("login")});
forgotLink.addEventListener("click",()=>setMode("forgot"));
document.getElementById("togglePassword").addEventListener("click",()=>{password.type=password.type==="password"?"text":"password"});
form.addEventListener("submit",e=>{e.preventDefault();if(mode==="signup"&&password.value!==confirmPassword.value){notify("Passwords do not match.");return;}notify(mode==="forgot"?"Password reset preview only — no email was sent.":"This is a front-end demo. Connect a backend to enable real accounts.");});
