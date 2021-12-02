function navigateDepths(){
  document.getElementById('inputfile')
            .addEventListener('change', function() {
            var fr=new FileReader();
            var x = 0;
            var x2 = 0;
            var y = 0;
            var y2 = 0;
            var aim = 0;
            var endresult = 0;
            var endresult2 = 0;
            fr.onload=function(){
              const navigation = fr.result.split('\n');
              navigation.forEach(function(currentValue, index){
                    if(currentValue){
                      const command = currentValue.split(' ');
                      if(command[0] == "forward"){
                        x = x + parseInt(command[1]);
                        x2 = x2 + parseInt(command[1]);
                        if(aim != 0){
                          y2 = y2 + (parseInt(command[1])*aim);
                        }
                      } else if (command[0] == "down") {
                        y = y + parseInt(command[1]);
                        aim = aim + parseInt(command[1]);
                      } else if (command[0] == "up") {
                        y = y - parseInt(command[1]);
                        aim = aim - parseInt(command[1]);
                      }
                    }
              })
              endresult = x * y;
              endresult2 = x2 * y2;
              document.getElementById('output').textContent = endresult;
              document.getElementById('part2output').textContent = endresult2;
            }
            fr.readAsText(this.files[0]);
        })
}
