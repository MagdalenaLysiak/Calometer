document.addEventListener('DOMContentLoaded', function(event) {
    var button = document.querySelector('#button_submit');

    button.addEventListener('click', function(event){
        var weight = document.querySelector('#weight').value,
        height = document.querySelector('#height').value,
        female = document.querySelector('#female'),
        male = document.querySelector('#male'),
        result = document.querySelector('.bmi_result'),
        height_fraction = parseInt(height)/100,
        height_pow = Math.pow(height_fraction,2);

        var bmi = (Math.round((parseInt(weight)/height_pow) * 100)/100).toFixed(1);
        result.removeAttribute('.hidden');
        var message = "";
        if(bmi<= 18.5){
          message = " Underweight - maybe you should think about proper diet first?"
          result.append(bmi);
          result.append(message);
        }
        if(bmi>= 18.5 && bmi <= 24.9){
          message = " You have normal weight"
          result.append(bmi);
          result.append(message);
        }
        if(bmi>= 25 && bmi <= 29.9){
          message = " You are overweight";
          result.append(bmi);
          result.append(message);
        }
        if(bmi>= 30){
          message = " Obesity.";
          result.append(bmi);
          result.append(message);
        }
});
    
});