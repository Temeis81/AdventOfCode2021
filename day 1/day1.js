function compareDepths(){
  document.getElementById('inputfile')
            .addEventListener('change', function() {
            var fr=new FileReader();
            var greaterThanIterations = 0;
            var greaterThanTripIs = 0;
            fr.onload=function(){
              const depthValues = fr.result.split('\n');
              depthValues.forEach(function(currentValue, index){
                  var prevValue = depthValues[index - 1];
                  if(currentValue > prevValue){
                    greaterThanIterations ++;
                  }
                  if(index >= 3){
                    var currentSetValue = parseInt(currentValue) + parseInt(depthValues[index-1]) + parseInt(depthValues[index-2]);
                    var prevSetValue = parseInt(depthValues[index - 1]) + parseInt(depthValues[index - 2]) + parseInt(depthValues[index - 3]);
                    if (Number.isFinite(currentSetValue) && currentSetValue > prevSetValue){
                      greaterThanTripIs ++;
                    }
                  }
              })
              document.getElementById('output').textContent = greaterThanIterations;
              document.getElementById('tripoutput').textContent = greaterThanTripIs;
            }
            fr.readAsText(this.files[0]);
        })
}
