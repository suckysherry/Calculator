
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function(e) {
        var input = document.querySelector('.screen');
        var inputVal = input.innerHTML;
        var btnVal = this.innerHTML;

        if(btnVal == 'C') {
            input.innerHTML = '';
            decimalAdded = false;
        }

        else if(btnVal == '=') {
            var equation = inputVal;
            var lastChar = equation[equation.length - 1];

            equation = equation.replace(/x/g,'*').replace(/÷/g,'/');

            /* 检查输入最后一个不是运算符，是小数点则替换*/
            if(operators.indexOf(lastChar) > -1 || lastChar == '.')
                equation = equation.replace(/.$/,'');

            /* eval()计算字符串的值 */
            if(equation)
                input.innerHTML = eval(equation);

            decimalAdded = false;
        }

            // 1. No two operators should be added consecutively.
            // 2. 除了减号等式不能以数字开头
            // 3. 一个数字只能有一个小数点

        else if(operators.indexOf(btnVal) > -1) {
            var lastChar = inputVal[inputVal.length-1];

            if(inputVal != '' && operators.indexOf(lastChar) == -1)
                input.innerHTML += btnVal;

            else if(inputVal == '' && btnVal == '-')
                input.innerHTML += btnVal;

            if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                input.innerHTML = inputVal.replace(/.$/, btnVal);
            }

            decimalAdded = false;
        }

        else if(btnVal == '.') {
            if(!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        }


        else {
            input.innerHTML +=btnVal;
        }

        e.preventDefault();
    }
}
