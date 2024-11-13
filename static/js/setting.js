
  /* update image - student_page */
  var reader ;
  var output; 
  var cc=false; 
  function preview_image(event){
    reader = new FileReader();
    reader.onload = function(){
    output = document.getElementById('output_image1');
    output.src = reader.result;
    cc=true;
    }
    reader.readAsDataURL(event.target.files[0]);
  }
  
  
  
/* input hidden - student_page */ 
var input_disabled=true;
var input_disabled2=true;

  document.getElementById('btn_2').hidden = true;
  document.getElementById('btn_4').hidden = true;
  for(i=0; i<=4; i++){
    document.getElementById('hidden_info_'+i).hidden = true; 
  }
 
/* input disabled - student_page */ 
var CountDownSecond; 

 function updateAccount(){
    if(input_disabled==true){  //display the btn + info
        input_disabled=false;color="green"
        document.getElementById('btn_1').value = "OK, Update";
        document.getElementById('btn_2').hidden = false;
        document.getElementById('hidden_info_'+0).hidden = false;//display the update_info(new)
        for(i=1; i<=2; i++){
            document.getElementById('info_'+i).hidden = false; //display the info(curr)
            document.getElementById('hidden_info_'+i).hidden = false;//display the update_info(new)
        }
        
　  }else{ //hidden the btn + info
        input_disabled=true;
        document.getElementById('btn_1').value = "Update Account Info";
        document.getElementById('btn_2').hidden = true;
        document.getElementById('hidden_info_'+0).hidden = true;//hidden the update_info(new)
        if(cc){
          output = document.getElementById('output_image0');
          output.src = reader.result;
        }
        for(i=1; i<=2; i++){
            document.getElementById('info_'+i).hidden = false;//display the info(curr)
            document.getElementById('hidden_info_'+i).hidden = true;//hidden the update_info(new)
            document.getElementById('btn_2').hidden = true;
            /* student information - student_page */ 
            if(document.getElementById('hidden_info_'+i).value != ""){
              if(i!=2){
                document.getElementById('info_'+i).innerHTML = document.getElementById('hidden_info_'+i).value;
              }else if(i==2){
                var selectedGender = document.querySelector('input[name="gender_type"]:checked').value;
                document.getElementById('info_' + 2).innerHTML = selectedGender;
              }

            }
        }
　  }
}

function reset(){
  input_disabled=true;
  document.getElementById('btn_1').value = "Update Account Info";
  document.getElementById('btn_2').hidden = true;
  document.getElementById('hidden_info_'+0).hidden = true;//hidden the update_info(new)
  for(i=1; i<=2; i++){
      document.getElementById('info_'+i).hidden = false;//display the info(curr)
      document.getElementById('hidden_info_'+i).hidden = true;　//hidden the update_info(new)
      document.getElementById('hidden_info_'+i).value = "";
  }
}

function updateAccount2(){
  if(input_disabled2==true){  //display the btn + info
      input_disabled2=false;color="green"
      document.getElementById('btn_3').value = "OK, Update";
      document.getElementById('btn_4').hidden = false;
      for(i=3; i<=4; i++){
          document.getElementById('info_'+i).hidden = false; //display the info(curr)
          document.getElementById('hidden_info_'+i).hidden = false;//display the update_info(new)
      }
      
　  }else{ //hidden the btn + info
      input_disabled2=true;
      document.getElementById('btn_3').value = "Update Account Info";
      document.getElementById('btn_4').hidden = true;
      for(i=3; i<=4; i++){
          document.getElementById('info_'+i).hidden = false;//display the info(curr)
          document.getElementById('hidden_info_'+i).hidden = true;//hidden the update_info(new)
          document.getElementById('btn_4').hidden = true;
          /* student information - student_page */ 
          if(document.getElementById('hidden_info_'+i).value != ""){
            document.getElementById('info_'+i).innerHTML = document.getElementById('hidden_info_'+i).value;

            
          }
      }
　  }
}

function reset2(){
input_disabled2=true;
document.getElementById('btn_3').value = "Update Account Info";
document.getElementById('btn_4').hidden = true;
for(i=3; i<=4; i++){
    document.getElementById('info_'+i).hidden = false;//display the info(curr)
    document.getElementById('hidden_info_'+i).hidden = true;　//hidden the update_info(new)
    document.getElementById('hidden_info_'+i).value = "";
}
}

/* color text - click to red text */
document.getElementById('00').style.color = "red";

function redText(num) {
  document.getElementById(num).style.color = "red";
}

 









   
  

  
  
  