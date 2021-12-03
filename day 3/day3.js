function diagnose(){
  document.getElementById('inputfile')
            .addEventListener('change', function() {
            var fr=new FileReader();
            var powerUse = 0;
            var lifeSupport = 0;
            fr.onload=function(){
              const input = fr.result.split('\n');
              const codeLength = input[0].length-1;
              const ones = new Array(codeLength).fill(0);
              const zeroes = new Array(codeLength).fill(0);
              input.forEach(code => {
                for (let i = 0; i < codeLength; i++) {
                  if (code[i] == '0') {
                    zeroes[i]++;
                  } else {
                    ones[i]++;
                  }
                }
              });

              const getOnesAndZeroesForPos = (pos, numbers) => {
                  let zero = 0;
                  let one = 0;

                  numbers.forEach(num => {
                      if (num[pos] == '0') {
                          zero++;
                      } else {
                          one++;
                      }
                  })

                  return [zero, one];
              };

              let oxygen = [...input];

              for (let i = 0; i < codeLength; i++) {
                  const [zero, one] = getOnesAndZeroesForPos(i, oxygen);
                  const whatToKeep = one >= zero ? '1' : '0';
                  oxygen = oxygen.filter(value => {
                      return value[i] == whatToKeep;
                  });
                  if (oxygen.length == 1) {
                      break;
                  }
              }

              let co2 = [...input];

              for (let i = 0; i < codeLength; i++) {
                  const [zero, one] = getOnesAndZeroesForPos(i, co2);
                  const whatToKeep = zero <= one ? '0' : '1';
                  co2 = co2.filter(value => {
                      return value[i] == whatToKeep;
                  });
                  if (co2.length == 1) {
                      break;
                  }
              }

              const oxygenValue = parseInt(oxygen[0], 2);
              const co2Value = parseInt(co2[0], 2);

              const zeroIfValSmaller = (val, other) => {
                if (val < other) {
                  return 0;
                }
                return 1;
              }

              const gamma = parseInt(ones.map((v, i) => zeroIfValSmaller(v, zeroes[i])).join(''), 2);
              const epsilon = parseInt(ones.map((v, i) => zeroIfValSmaller(zeroes[i], v)).join(''), 2);

              powerUse = gamma * epsilon;
              lifeSupport = oxygenValue * co2Value;
              document.getElementById('output').textContent = powerUse;
              document.getElementById('output2').textContent = lifeSupport;
            }
            fr.readAsText(this.files[0]);
        })
}
