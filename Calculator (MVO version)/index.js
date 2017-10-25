$(document).ready(function(){
    //model
    const model = {
        numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3],
        operators: ['+', '-', '*', '/'],
        specialOperators: ['AC', 'CE'],
        theOthers: [0, '.', '='],
        screen: '0',
        lastChar: ''
    }

    //octopus
    const octopus = {
        init: function(){
            viewStatic.init();
            viewScreen.init();
        },
        getNumbers: function(){
            return model.numbers;
        },
        getOperators: function(){
            return model.operators;
        },
        getSpecialOperators: function(){
            return model.specialOperators;
        },
        getTheOthers: function(){
            return model.theOthers;
        },
        setScreenWithNumber: function(number){
            this.setScreen(number);
            viewScreen.render();
        },

        //when user click operators
        setScreenWithOperator: function(operator){
            let lastChar = this.getLastChar();
            // alert(lastChar);
            let operators = this.getOperators();
            console.log(operators);
            if (operators.indexOf(lastChar) === -1) {
                
                this.setScreen(operator);
            }
            viewScreen.render();
        },
        //when user click '0', '.' or '='
        setScreenWithOthers: function(other){
            let lastChar = this.getLastChar();
            let express = this.getScreen();    
            if (other === '=') {
                model.screen = eval(express);
                viewScreen.render();
            }
            if (other === '0') {
                this.setScreenWithNumber('0');
            }
            if (other === '.') {
                this.setScreenWithNumber('.');
            }
        },
        //when user click 'AC' or 'CE'
        setScreenWithSpecial: function(special){
            let screen = model.screen;
            if (special === 'AC') {
                model.screen = '0';
                viewScreen.render();
            }
            if (special === 'CE') {
                model.screen = model.screen.substr(0, model.screen.length -1);
                viewScreen.render();
            }
        },
        getScreen: function(){
            return model.screen;
        },
        setScreen: function(data){
            let screen = model.screen;
            if (screen === '0') {
                model.screen = data;
            } else{
                model.screen += data;
            }
            
            
        },
        getLastChar: function(){
            let screen = model.screen;
            return screen[screen.length - 1];
        },
        checkDot: function(){

        }
    }

    //view static
    const viewStatic = {
        init: function(){
            this.numbers = octopus.getNumbers();
            this.operators = octopus.getOperators();
            this.specials = octopus.getSpecialOperators();
            this.others = octopus.getTheOthers();
            viewStatic.render();
        },
        render: function(){
            let htmlNumbers = '';
            let htmlOperators = '';
            let htmlSpecial = '';
            let htmlTheOther = '';
            this.numbers.forEach((number) => {
                htmlNumbers += '<button>' + number + '</button>';
            });
            this.operators.forEach((operator) => {
                htmlOperators += '<button>' + operator + '</button>';
            });
            this.specials.forEach((special) => {
                htmlSpecial += '<button>' + special + '</button>';
            });
            this.others.forEach((other) => {
                htmlTheOther += '<button>' + other + '</button>';
            });
            
            $('#numbers').html(htmlNumbers);
            $('#special').html(htmlSpecial);
            $('#operators').html(htmlOperators);
            $('#theothers').html(htmlTheOther);
        }
    }

    //view screen
    const viewScreen = {
        init: function(){
            //event user click number buttons
            $('#numbers button').click(function(){
                let number = $(this).text();
                // alert(number);
                octopus.setScreenWithNumber(number);
            })
            //event user click operator button
            $('#operators button').click(function(){
                let operator = $(this).text();
                octopus.setScreenWithOperator(operator);
            })
            //event user click button '0', '.', '='
            $('#theothers button').click(function(){
                let other = $(this).text();
                octopus.setScreenWithOthers(other);
            })
            //event user click special buttons
            $('#special button').click(function(){
                let special = $(this).text();
                octopus.setScreenWithSpecial(special);
            })
            viewScreen.render();
        },
        render: function(){
            let screen = octopus.getScreen();
            $('#screen').text(screen);
        }
    }
    octopus.init();
})