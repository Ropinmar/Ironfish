// @import url('https://fonts.googleapis.com/css2?family=Love+Ya+Like+A+Sister&display=swap');
//canvas
const canvas = document.querySelector('canvas');
//contexto
const ctx = canvas.getContext('2d');
//propiedades texto
ctx.font = "24px Love Ya Like A Sister";
//imagenes personaje
const fishImage0 = new Image();
const fishImage1 = new Image();
const fishImage2 = new Image();
const fishImage3 = new Image();
fishImage0.src = "../img/fish-frame0.gif"
fishImage1.src = "../img/fish-frame1.gif"
fishImage2.src = "../img/fish-frame2.gif"
fishImage3.src = "../img/fish-frame3.gif"

const fishFrames = [fishImage0, fishImage1, fishImage2, fishImage3];

//imagenes enemigo 
const enemyImage0 = new Image();
const enemyImage1 = new Image();
const enemyImage2 = new Image();
const enemyImage3 = new Image();
const enemyImage4 = new Image();
enemyImage0.src = "../img/enemy-frame0.gif"
enemyImage1.src = "../img/enemy-frame1.gif"
enemyImage2.src = "../img/enemy-frame2.gif"
enemyImage3.src = "../img/enemy-frame3.gif"
enemyImage4.src = "../img/enemy-frame4.gif"

const enemyFrames = [enemyImage0, enemyImage1, enemyImage2, enemyImage3, enemyImage4];

//imagenes comida
const fishFood0 = new Image();
const fishFood1 = new Image();
const fishFood2 = new Image();
const fishFood3 = new Image();
const fishFood4 = new Image();
fishFood0.src = "../img/fish-food-frame0.gif"
fishFood1.src = "../img/fish-food-frame1.gif"
fishFood2.src = "../img/fish-food-frame2.gif"
fishFood3.src = "../img/fish-food-frame3.gif"
fishFood4.src = "../img/fish-food-frame4.gif"

const foodFrames = [fishFood0, fishFood1, fishFood2, fishFood3, fishFood4];

//imagen de bomba
const bombImg = new Image();
bombImg.src ="../img/boom-img.gif"

//imagen de explosion
const explosionPic = new Image();
explosionPic.src = "../img/boom-img-touch.gif"

//medidas canvass
//ancho 1000 - alto 600

//boton de pausa
const pauseB = document.getElementById('pause');//--------------------------------------------------------------------------------------
//boton de goal 
const openGoal = document.getElementById('open-goal');
const closeGoal = document.getElementById('close-goal');
const modal = document.getElementById('modal');

openGoal.addEventListener('click', () => {
    modal.showModal();
});
closeGoal.addEventListener('click', () => {
    modal.close();
})


//lista enemigos
const enemies = [];
//lista de comida
const allFood = [];
//lista de bombas
const allBombs= [];
//lista de explosiones
const allExplosion = [];
//medidas del rect 100 * 30
// ctx.fillRect(450,320,100,30);


//definiendo el pez con Class el primero---------------------------------------------

class Fish{
    constructor(ctx, positionX, positionY, image){
        this.name = "Juanito"
        this.lives = 5;
        this.energy = 0;
        this.score = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.ctx = ctx;
    }
    //metodos
    goRight(){
        // console.log("x", this.positionX);
        if(this.positionX + 150 < 1000){
            this.positionX = this.positionX + 30;
        }
    }
    goLeft(){
        if(this.positionX > 0){
            this.positionX = this.positionX - 20;
        }
    }
    goUp(){
        if(this.positionY > 0){
            this.positionY = this.positionY - 20;
        }
    }
    goDown(){
        if(this.positionY + 90 < 600){
            this.positionY = this.positionY + 20;
        }
    }
    fire(){
        // console.log("disparar");
        if(allBombs.length < 10){
            const theBomb = new Bomba(ctx, player.positionX + 130, player.positionY + 20, bombImg);
            //agregar al arreglo allBombs
            allBombs.push(theBomb);
        }
        
    }
    drawn(){
        //this.ctx.fillRect(this.positionX, this.positionY,100,30);
        this.ctx.drawImage(this.image, this.positionX, this.positionY, 150, 90);

        //vidas
        this.ctx.fillText(`Lives: ${this.lives}`, 40, 40);
        //energia
        this.ctx.fillText(`Energy: ${this.energy}`, 40, 80);
        //puntaje - score
        this.ctx.fillText(`Score: ${this.score}`, 840, 40);
    }
    updateLives(){
        this.lives = this.lives - 1;
    }
    updateEnergy(){
        this.energy = this.energy + 10;
    }
    
    
}

//Esta es la instancia -----------------------------------------------------
const player = new Fish(ctx, 120, 300, fishImage0);
//console.log(player);

let counter = 0;
let forPause = false;
//Definir enemigo como el personaje del pez

class Enemy{
    constructor(ctx, positionX, positionY, image){
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.ctx = ctx;
    }
    //metodos
    goLeft(){
        this.positionX = this.positionX - 10;
    }
    //dibujar
    drawn(){
        //this.ctx.fillRect(this.positionX, this.positionY,100,30);
        this.ctx.drawImage(this.image, this.positionX, this.positionY, 150, 90);
    }
    
    
}

//instacia de enemigo

let counterEnemy = 0;

//definir comida pez

class Food{
    constructor(ctx, positionX, positionY, image){
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.ctx = ctx;
    }
    //metodos
    goDown(){
        this.positionY = this.positionY + 10;
    }
    //dibujar
    drawn(){
        //this.ctx.fillRect(this.positionX, this.positionY,100,30);
        this.ctx.drawImage(this.image, this.positionX, this.positionY, 100, 60);
    }
}
//instancia de la comida 


let counterFood = 0;

//clase para la bomba
class Bomba{
    constructor(ctx, positionX, positionY, image){
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.ctx = ctx;
    }
    //metodos
    goRight(){
        // console.log("x", this.positionX);
        this.positionX = this.positionX + 30;
        
    }
    //dibujar
    drawn(){
        //this.ctx.fillRect(this.positionX, this.positionY,100,30);
        this.ctx.drawImage(this.image, this.positionX, this.positionY, 40, 40);
    }
};

class Explosion{
    constructor(ctx, positionX, positionY, image){
        this.positionX = positionX;
        this.positionY = positionY;
        this.image = image;
        this.ctx = ctx;
        this.size = 50;
    }
    //dibujar
    drawn(){
        //this.ctx.fillRect(this.positionX, this.positionY,100,30);
        this.ctx.drawImage(this.image, this.positionX, this.positionY, this.size, this.size);
        this.positionX -= 5;
        this.positionY -= 5;
        this.size += 30;
    }
}
//instancia de bomba la ponemos en el metodo fire

// let timer = 0;

//setInterval para el video juego ----------------------------------------------------

let firstInterval;

function startGame(){
firstInterval = setInterval(()=>{
    // console.log("Ejecuta");

    //borrando
    ctx.clearRect(0, 0, 1000, 600);
    player.drawn();
    updateFrames();
    
    //recorrer el arreglo de los enemigos y por cada uno dibujarlo y agregarlo en X
    enemies.forEach((fishEnemy, positionEnemy)=>{
        fishEnemy.drawn();
        fishEnemy.goLeft();
        fishEnemy.image = enemyFrames[counterEnemy];
        //colision con enemigo
        //colision en x y colision en y
        if(
            fishEnemy.positionX <= player.positionX + 110 && 
            player.positionX  <= fishEnemy.positionX + 120 &&
            player.positionY <= fishEnemy.positionY + 60 &&
            player.positionY + 70 >= fishEnemy.positionY
            ){
            player.updateLives();
            //quitar enemigo de array
            enemies.splice(positionEnemy, 1);
            //sigue vivo
            if(player.lives == 0){
                swal('GAME OVER!!!!', 'TRY AGAIN', 'error')
            }
        }
        if(fishEnemy.positionX < 0){
            //quitar enemigo de array
            enemies.splice(positionEnemy, 1);
        }
    });

    //recorrer arreglo de comida y por cada uno dibujarlo y agregarlo en y
    allFood.forEach((foodForFish, positionFood)=>{
        foodForFish.drawn();
        foodForFish.goDown();
        foodForFish.image = foodFrames[counterFood];
        
        //Colision con comida
        if(
            foodForFish.positionY >= player.positionY + 40 &&
            player.positionX <= foodForFish.positionX + 50 &&
            player.positionX + 100 >= foodForFish.positionX
            ){
            player.updateEnergy();
            //quitar comida del array
            allFood.splice(positionFood, 1);
            //sigue vivo
            if(player.energy >= 100 && player.score >= 10){
                swal('YOU WIN!!!!', 'GOOD JOB', 'success');
            }
        }
    });
    //console.log(player.positionX, fishEnemy.positionX);
    //recorrer el arreglo de bombas y por cada uno dibujarlo y agregarlo en x
    allBombs.forEach((theBomb, indexBomb)=>{
        theBomb.drawn();
        theBomb.goRight();
        //quitar bomba si sale del cuadro 
        if(theBomb.positionX + 20 > 1000){
            allBombs.splice(indexBomb, 1);
        }
        //colisión con enenmigo
        // console.log("bombX", theBomb.positionX);
        enemies.forEach((fishEnemy, indexEnemy)=>{
            // console.log("enemyX", fishEnemy.positionX);
            if(
                theBomb.positionX + 20 >= fishEnemy.positionX &&
                theBomb.positionY + 20 >= fishEnemy.positionY &&
                theBomb.positionY <= fishEnemy.positionY + 60
            ) {
                //quitar bomba
                allBombs.splice(indexBomb, 1);
                //quitar enemigo
                enemies.splice(indexEnemy, 1);
                player.score += 1;
                //explosion
                // console.log("Explosion");
                const theExplosion = new Explosion(ctx, theBomb.positionX + 20, theBomb.positionY, explosionPic);
                allExplosion.push(theExplosion);
            }
        });
    });

    //dibujar misiles
    ctx.fillText(`Bombs: ${allBombs.length}`, 840, 80);

    allExplosion.forEach((theExplosion, indexExplosion) => {
        theExplosion.drawn()
        if(theExplosion.size > 90){
            allExplosion.splice(indexExplosion, 1)
        }
    });

}, 1000 / 6);
//setInterval para la comida 
setInterval(()=>{
    //dibujando comida--------------
    // foodForFish.goDown();
    //foodForFish.drawn();
    

    // crear comida con funcion 
    if(Math.floor(Math.random()*2) == 1){
        //salida random en x
        const widhtX = Math.floor(Math.random()*940);
        const foodForFish = new Food(ctx, widhtX, 0, fishFood0);
        allFood.push(foodForFish);
        // console.log(allFood);
    }
}, 2000);
//setInterval para el enemigo 
setInterval(()=>{
    //dibujando enemigo-----------------
    // fishEnemy.goLeft();
    // fishEnemy.drawn();
    

    //crear enemigo con funcion 
    //Math.random()
    if(Math.floor(Math.random()*2) == 1){
        //Salida random en y
        const heightY = Math.floor(Math.random()*510);
        const fishEnemy = new Enemy(ctx, 1000, heightY, enemyImage0);
        enemies.push(fishEnemy);
        // console.log(enemies);
    }
}, 2500);
};

startGame();
function updateFrames (){
    player.image = fishFrames[counter];
    if(counter < 3){
        counter++;
    }else{
        counter = 0;
    }

    //fishEnemy.image = enemyFrames[counterEnemy];
    if(counterEnemy < 4){
        counterEnemy++;
    }else{
        counterEnemy = 0;
    }

    ///foodForFish.image = foodFrames[counterFood];
    if(counterFood < 4){
        counterFood++;
    }else{
        counterFood = 0;
    }
}

//escuchar teclado 
window.addEventListener('keyup', (event)=>{
    // console.log('tecla presionada', event.code);

    /*
    switch(event.code){
            case "KeyD":
                player.goRight();
                break;
            case "ArrowRight":
                player.goRight();
                break;
            case "KeyS":
                player.goDown();
                break;
            case "ArrowDown":
                player.goDown();
                break;
            case "KeyA":
                player.goLeft();
                break;
            case "ArrowLeft":
                player.goLeft();
                break;
            case "KeyW":
                player.goUp();
                break;
            case "ArrowUp":
                player.goUp();
                break;
            case "Space":
                player.fire();;
                break;
        }
    */

    if(event.code == "KeyD" || event.code == "ArrowRight"){
        player.goRight();
    }else if(event.code == "KeyS" || event.code == "ArrowDown"){
        player.goDown();
    }else if(event.code == "KeyA" || event.code == "ArrowLeft"){
        player.goLeft();
    }else if(event.code == "KeyW" || event.code == "ArrowUp"){
        player.goUp();
    }else if(event.code == "KeyP"){
        player.fire();
    }
});

//poniendo pausa
pauseB.addEventListener('click', () => {
    if(forPause == false){
        clearInterval(firstInterval);
        forPause = true;
    }else{
        startGame();
        forPause = false;
    }
    //swal('pause');
})


