$(document).ready(function(){

    //model
    const model = {
        currentDog: null,
        dogs: [
            {
                name: 'super dog',
                src: './img/dog1.jpg',
                counter: 0
            },
            {
                name: 'super kute',
                src: './img/dog2.jpg',
                counter: 0
            },{
                name: 'phu quoc',
                src: './img/dog3.jpg',
                counter: 0
            },
            {
                name: 'bac kinh',
                src: './img/dog4.jpg',
                counter: 4
            },
            {
                name: 'china dog',
                src: './img/dog5.jpg',
                counter: 5
            },
    ],
        isShow: true
    }
    //controller
    const octopus = {
        getListDogs: function(){
            return model.dogs;
        },
        getCurrentDog: function(){
            return model.currentDog;
        },
        setCurrentDog: function(dog){
            model.currentDog = dog;
            viewImage.render();
        },
        incrementCounter: function(){
            model.currentDog.counter++;
            viewImage.render();
        },
        init: function(){
            model.currentDog = model.dogs[0];
            viewListName.init();
            viewImage.init();
            viewAdmin.init();
        },
        getIsShow: function(){
            return model.isShow;

        },
        setIsShow: function(status){
            model.isShow = status;
            viewAdmin.render();
        }
        
    }
    //view list name
    const viewListName = {
        init: function(){
            this.nameList = $('#name-list'); 
            viewListName.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getListDogs().forEach((dog) => {
                htmlStr += '<li>' + dog.name + '</li>';
            })
            this.nameList.html(htmlStr);
            $('#name-list li').click(function(){
                // alert($(this).text());  
                let dogs = octopus.getListDogs();
                let currentDog = dogs.filter((dog) => {
                    if(dog.name === $(this).text()){
                        return dog;
                    }
                    
                })[0]
                console.log(currentDog);
                octopus.setCurrentDog(currentDog);

            });
        }
    }
    //view image
    const viewImage = {
        init: function(){
            this.render();
            this.imgDog = $('#img-dog');
            this.imgDog.click(function(){
                octopus.incrementCounter();
            })
        },
        render: function(){
            const currentDog = octopus.getCurrentDog();
            // console.log(currentDog);
            
            $('#click-counter').text(currentDog.counter);
            $('#img-dog').attr({'src': currentDog.src});
            // alert($('#name-dog').text(currentDog.name))
            $('#name-dog').text(currentDog.name);
        }
    }
    const viewAdmin = {
        init: function(){
            this.form = $('#form-admin');
            
            $('#button-admin').click(function(){
                octopus.setIsShow(true);
            });
            
            $('#button-save').click(function(){
                let name = $('#form-name').val();
                let src = $('#form-src').val();
                let counter = $('#form-click').val();
                
                const current = {
                    name: name,
                    src: src,
                    counter: counter
                }
                // alert(current);
                octopus.setCurrentDog(current);
                octopus.setIsShow(false);
            });
            $('#button-cancel').click(function(){
                octopus.setIsShow(false);
            });
        },
        render: function(){
            let isShow = octopus.getIsShow();
            if (isShow){
                this.form.show();
            } else {
                this.form.hide();
            }
            
        }
    }
    octopus.init();
})