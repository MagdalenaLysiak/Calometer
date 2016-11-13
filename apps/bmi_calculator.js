document.addEventListener('DOMContentLoaded', function(event) {
    var button = document.querySelector('#button_submit');

    button.addEventListener('click', function(event){
        var weight = document.querySelector('#weight').value,
        height = document.querySelector('#height').value,
        female = document.querySelector('#female'),
        male = document.querySelector('#male'),
        result = document.querySelector('.bmi_result'),
        height_fraction = parseInt(height)/100,
        height_pow = Math.pow(height_fraction,2),
        bmi = (Math.round((parseInt(weight)/height_pow) * 100)/100).toFixed(1),
        message = "";
        
        result.removeAttribute('.hidden');
        if(bmi<= 18.5){
          result.innerHTML = "";
          message = "Your BMI is: " + bmi + ". Underweight - maybe you should think about proper diet first?";
          result.append(message);
        }
        if(bmi>= 18.5 && bmi <= 24.9){
          result.innerHTML = "";
          message = "Your BMI is: " + bmi + ". Your weight is within limits. Do you want it to be perfect?";
          result.append(message);
        }
        if(bmi>= 25 && bmi <= 29.9){
          result.innerHTML = "";
          message = "Your BMI is: " + bmi + ". Overweight. Let's burn these calories!";
          result.append(message);
        }
        if(bmi>= 30){
          result.innerHTML = "";
          message = "Your BMI is: " + bmi + ". Obesity. Proper exercise and healthy diet should help.";
          result.append(message);
        }
    });
    
    var targetWeight = document.querySelector('#target_weight'),
        kg_result = document.querySelector('.kg_result');
    
        targetWeight.addEventListener('blur', function(event){
          var targetValue = targetWeight.value,
              weight = document.querySelector('#weight').value,
              kg = parseInt(weight)-parseInt(targetValue),
              kg_message = "You need to burn " + kg + "kg to succeed.";
           kg_result.innerHTML = "";
           kg_result.append(kg_message);
    });
    
});