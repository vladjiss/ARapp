function toggleHidden(element) {
    /*var nextElement = element.nextElementSibling;
  
    if (nextElement) {
      nextElement.classList.remove('hidden');
    }
    
    element.classList.add('hidden');*/
  }






const progressLineElement = document.getElementById("progressLine");
const percentElement = document.getElementById("percent");
/*

let currentPercent = parseInt(percentElement.innerText);
const targetPercent = 100;
const game_step = 1; // Измените значение, как вам угодно
const delay = 10; // Задержка в миллисекундах между шагами

function increasePercent() {
    if (currentPercent < targetPercent) {
        currentPercent += game_step;
        if (currentPercent > targetPercent) {
            currentPercent = targetPercent;
        }

        percentElement.innerText = currentPercent + '%';
        progressLineElement.style.width = currentPercent + '%';

        setTimeout(increasePercent, delay);
    }
}
increasePercent();*/


// Задаем высоту body равной window.innerHeight
document.body.style.height = window.innerHeight + 'px';

window.addEventListener('resize', function() {
  document.body.style.height = window.innerHeight + 'px';
});

/////////////////////////////////////
let CARDS = [{
    step:0,
    words: ["img/sketches/m6_s.jpg",
            "img/sketches/m18_s.jpg",
            "img/sketches/m20_s.jpg",
            "img/sketches/m29_s.jpg",
            "img/sketches/m36_s.jpg",
            "img/sketches/m45_s.jpg",
            "img/sketches/m50_s.jpg",
            "img/sketches/m51_s.jpg",
            "img/sketches/m53_s.jpg",
            "img/sketches/m66_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m48_s.jpg",
        "img/sketches/m54_s.jpg",
        "img/sketches/m55_s.jpg",
        "img/sketches/m69_s.jpg",
        "img/sketches/m76_s.jpg",
        "img/sketches/m82_s.jpg",
        "img/sketches/m85_s.jpg",
        "img/sketches/m87_s.jpg",
        "img/sketches/m96_s.jpg",
        "img/sketches/m98_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m25_s.jpg",
        "img/sketches/m37_s.jpg",
        "img/sketches/m52_s.jpg",
        "img/sketches/m56_s.jpg",
        "img/sketches/m68_s.jpg",
        "img/sketches/m70_s.jpg",
        "img/sketches/m74_s.jpg",
        "img/sketches/m75_s.jpg",
        "img/sketches/m78_s.jpg",
        "img/sketches/m101_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m79_s.jpg",
        "img/sketches/m21_s.jpg",
        "img/sketches/m23_s.jpg",
        "img/sketches/m2_s.jpg",
        "img/sketches/m4_s.jpg",
        "img/sketches/m5_s.jpg",
        "img/sketches/m7_s.jpg",
        "img/sketches/m9_s.jpg",
        "img/sketches/m10_s.jpg",
        "img/sketches/m11_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m12_s.jpg",
        "img/sketches/m13_s.jpg",
        "img/sketches/m14_s.jpg",
        "img/sketches/m15_s.jpg",
        "img/sketches/m16_s.jpg",
        "img/sketches/m22_s.jpg",
        "img/sketches/m24_s.jpg",
        "img/sketches/m26_s.jpg",
        "img/sketches/m27_s.jpg",
        "img/sketches/m30_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m31_s.jpg",
        "img/sketches/m32_s.jpg",
        "img/sketches/m33_s.jpg",
        "img/sketches/m34_s.jpg",
        "img/sketches/m35_s.jpg",
        "img/sketches/m38_s.jpg",
        "img/sketches/m39_s.jpg",
        "img/sketches/m40_s.jpg",
        "img/sketches/m41_s.jpg",
        "img/sketches/m42_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m43_s.jpg",
        "img/sketches/m44_s.jpg",
        "img/sketches/m57_s.jpg",
        "img/sketches/m58_s.jpg",
        "img/sketches/m59_s.jpg",
        "img/sketches/m60_s.jpg",
        "img/sketches/m62_s.jpg",
        "img/sketches/m63_s.jpg",
        "img/sketches/m64_s.jpg",
        "img/sketches/m65_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m67_s.jpg",
        "img/sketches/m71_s.jpg",
        "img/sketches/m72_s.jpg",
        "img/sketches/m73_s.jpg",
        "img/sketches/m77_s.jpg",
        "img/sketches/m81_s.jpg",
        "img/sketches/m83_s.jpg",
        "img/sketches/m84_s.jpg",
        "img/sketches/m86_s.jpg",
        "img/sketches/m88_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m89_s.jpg",
        "img/sketches/m90_s.jpg",
        "img/sketches/m91_s.jpg",
        "img/sketches/m92_s.jpg",
        "img/sketches/m93_s.jpg",
        "img/sketches/m94_s.jpg",
        "img/sketches/m95_s.jpg",
        "img/sketches/m97_s.jpg",
        "img/sketches/m100_s.jpg",
        "img/sketches/m102_s.jpg"],
    guessed:[]
}, {
    step:0,
    words: ["img/sketches/m3_s.jpg",
        "img/sketches/m8_s.jpg",
        "img/sketches/m17_s.jpg",
        "img/sketches/m19_s.jpg",
        "img/sketches/m28_s.jpg",
        "img/sketches/m46_s.jpg",
        "img/sketches/m49_s.jpg",
        "img/sketches/m61_s.jpg",
        "img/sketches/m80_s.jpg",
        "img/sketches/m103_s.jpg"],
    guessed:[]
}];
const STEPS = {
    CHOOSE_TEAM: 0,
    CHOOSE_NAMES: 1,
    SCAN_FLOOR: 2,
    TAP_FLOOR: 3,
    SHOW_ALL: 4,
    NEXT: 5
}
const SECTIONS_LIST = {
    CHOOSE_TEAM: "choose_team",
    CHOOSE_NAMES: "names_form",
    WHOM_FIRST: "whoms_first",
    SCAN: "scan",
    CARD: "card",
    SHOW: "show",
    SHOW_ALL: "show_all",
    RESULTS: "results",
    NEXT: "next_game"
}
let choosen_teams = [];
let teams = [];
let game_step = STEPS.CHOOSE_TEAM;
let GAME = {
    started: false,
    current_card: 0,
    current_team: undefined,
    round: 0
}
function showSection(section){
    sendMessageToApp("log "+"showSection "+section)
    $("#"+section).removeClass("hidden")
}
function hideSection(section){
    sendMessageToApp("log "+"hideSection "+section)
    $("#"+section).addClass("hidden")
}
function buildTeams() {
    console.log("buildTeams")
    $("#names_form .player_name, #whoms_first .player_score_menu, #next_game .player_game, #results .player_score_menu").addClass("hidden");
    choosen_teams.forEach((t)=>{
        $("#names_form .team"+t+", #whoms_first .team"+t+", #next_game .team"+t+", #results .team"+t).removeClass("hidden");
        $("#results .team"+t+" p").text(teams[t]);
        $("#whoms_first .team"+t+" p").text(teams[t]);
    })
}
function startGame() {
    GAME.started = true;
    CARDS[GAME.current_card].guessed = []
    CARDS[GAME.current_card].step = 0
    choosen_teams.forEach((team_id)=>{
        GAME["team"+team_id] = {
            name: teams[team_id],
            score: 0
        }
    });
    $(".team_name").text(GAME["team"+GAME.current_team].name);
    $(".team_logo").addClass("team"+GAME.current_team);
    $(".game_score").text(GAME["team"+GAME.current_team].score);
    //startCart(CARDS[GAME.current_card])
}
function continueGame(){
    CARDS[GAME.current_card].guessed = []
    CARDS[GAME.current_card].step = 0
    //if(GAME.round < choosen_teams.length) {
        //GAME.current_team = choosen_teams[GAME.round % choosen_teams.length];
        $(".team_name").text(GAME["team" + GAME.current_team].name);
        $(".team_logo").addClass("team" + GAME.current_team);
        $(".game_score").text(GAME["team" + GAME.current_team].score);
    //}
}
function startCart(card) {
    $("#card .card_img").css({
        "background-image":"url('"+card.words[0]+"')"
    })
    startTimer(card)
}
let timer = 59;
let timerTimeout;
function startTimer(card) {
    if(card == undefined)
        card = CARDS[GAME.current_card];
    timer -= 1;
    $("#card .timer .seconds").text(timer);
    if(timer > 0) {
        timerTimeout = setTimeout(function () {
            startTimer(card);
        },1000)
    }
    else {
        skip(card);
    }
}
function skip(card){
    if(card == undefined)
        card = CARDS[GAME.current_card];
    clearTimeout(timerTimeout);
    sendMessageToApp("hideAll")
    /*if(card.game_step < 9) {
        card.game_step++;
        $("#card .object").text(card.words[card.game_step])
        timer = 60;
        startTimer(card)
    }
    else {
        finish(card)
    }*/
    //hideSection(SECTIONS_LIST.CARD)
    //showSection(SECTIONS_LIST.SHOW)

    if(card.step < card.words.length-1) {
        card.step++;
        //$("#card .object").text(card.words[card.game_step])
        $("#card .card_img").css({
            "background-image":"url('"+card.words[card.step]+"')"
        })
        timer = 59;
        hideSection(SECTIONS_LIST.SHOW)
        showSection(SECTIONS_LIST.CARD)
        startTimer()
        sendMessageToApp('hideAll');
    }
    else {
        finish(card)
    }
}
function accept(card){
    if(card == undefined)
        card = CARDS[GAME.current_card];
    clearTimeout(timerTimeout);
    card.guessed.push(card.step)
    GAME["team"+GAME.current_team].score++;
    $(".game_score").text(GAME["team"+GAME.current_team].score);
    $(".team"+GAME.current_team+" .score_menu").text(GAME["team"+GAME.current_team].score)
    sendMessageToApp('show'+card.step);
    /*if(card.game_step < card.words.length-1) {
        card.game_step++;
        $("#card .object").text(card.words[card.game_step])
        timer = 60;
        //startTimer(card)
        hideSection(SECTIONS_LIST.CARD)
        showSection(SECTIONS_LIST.SHOW)
    }
    else {
        finish(card)
    }*/
    hideSection(SECTIONS_LIST.CARD)
    showSection(SECTIONS_LIST.SHOW)
}
let interval_new_scene;
function finish(card){
    clearInterval(interval_new_scene);
    game_step = STEPS.SHOW_ALL;
    GAME.round++;
    console.log("finish")
    if(card == undefined)
        card = CARDS[GAME.current_card];
    hideSection(SECTIONS_LIST.CARD)
    hideSection(SECTIONS_LIST.SHOW)
    showSection(SECTIONS_LIST.SHOW_ALL);
    setTimeout(function(){
        if(game_step == STEPS.SHOW_ALL) {
            $(".instruction_1").removeClass("hidden")
        }
    },2000)
    setTimeout(function(){
        if(game_step == STEPS.SHOW_ALL) {
            $(".instruction_1").addClass("hidden")
            $(".instruction_2").removeClass("hidden")
        }
    },4500)
    setTimeout(function(){
        if(game_step == STEPS.SHOW_ALL) {
            $(".instruction_2").addClass("hidden")
            $(".instruction_3").removeClass("hidden")
        }
    },7000)
    setTimeout(function(){
        $(".instruction_3").addClass("hidden")
    },9500)
    //showSection(SECTIONS_LIST.SHOW)
    sendMessageToApp('finish');
    setTimeout(function(){
        interval_new_scene = setInterval(function (){
            if($(".loadPage").hasClass("hidden")){
                clearInterval(interval_new_scene);
                let once = false;
                //$("body").on("click",function () {
                    if(!once) {
                        once = true;
                        setTimeout(function () {

                            card.guessed.forEach((elem) => {
                                sendMessageToApp('show' + elem);
                            })
                        }, 1000)
                    }
                //})
            }
        },200)
    },1000);
    choosen_teams.forEach((t)=>{
        $("#next_game .team"+t+" .score_result").text(GAME["team"+t].score);
    })
}
//block choose_team
$("#choose_team .player").on("click",function(){
    let team_number = Number($(this).attr("data-index"));
    if(!choosen_teams.includes(team_number)){
        choosen_teams.push(team_number);
        $(this).addClass("play_select")
    }
    else {
        choosen_teams.splice(choosen_teams.indexOf(team_number),1)
        $(this).removeClass("play_select")
    }
    if(choosen_teams.length>1){
        $("#choose_team .footer_button").removeClass("disabled")
    }
    else {
        $("#choose_team .footer_button").addClass("disabled")
    }
    buildTeams()
})
$("#choose_team .footer_button").on("click",function(){
    hideSection(SECTIONS_LIST.CHOOSE_TEAM)
    showSection(SECTIONS_LIST.CHOOSE_NAMES)
})
//block names_form
let name_inputs = document.getElementsByClassName("name_input");
for(var i = 0; i < name_inputs.length; i++){
    let elem = name_inputs[i]
    elem.addEventListener("input",function(){
        let team_number = Number($(this).attr("data-index"));
        teams[team_number] = $(this).val();
        console.log($(this).val())
        //if(teams.length == choosen_teams.length) {
        let found_empty = false
        $("#names_form .footer_button").addClass("disabled")
        for (var i = 0; i < choosen_teams.length; i++) {
            if (teams[choosen_teams[i]] == "" || teams[choosen_teams[i]] == undefined) {
                found_empty = true;
            }
        }
        if(!found_empty)
            $("#names_form .footer_button").removeClass("disabled")
        // }
        buildTeams()
    });
}
$("#names_form .footer_button").on("click",function(){
    hideSection(SECTIONS_LIST.CHOOSE_NAMES)
    showSection(SECTIONS_LIST.WHOM_FIRST)
})
$("#names_form .btn-back").on("click",function(){
    $("#names_form .name_input").val("")
    $("#names_form .footer_button").addClass("disabled")
    hideSection(SECTIONS_LIST.CHOOSE_NAMES)
    showSection(SECTIONS_LIST.CHOOSE_TEAM)
})
//block whoms_first
$("#whoms_first .player_score_menu").on("click",function(){
    let team_number = Number($(this).attr("data-index"));
    $("#whoms_first .player_score_menu").removeClass("play_select")
    if(choosen_teams.includes(team_number)){
        GAME.current_team = team_number;
        $(this).addClass("play_select")
    }
    $("#whoms_first .footer_button").removeClass("disabled")
})
$("#whoms_first .footer_button").on("click",function(){
    startGame();
    sendMessageToApp("scan")
    setTimeout(function(){
        hideSection(SECTIONS_LIST.WHOM_FIRST)
        showSection(SECTIONS_LIST.SCAN)
        $(".instruction_card").removeClass("hidden");
    },1000)
})
$("#whoms_first .btn-back").on("click",function(){
    $("#whoms_first .play_select").removeClass("play_select")
    $("#whoms_first .footer_button").addClass("disabled")
    hideSection(SECTIONS_LIST.WHOM_FIRST)
    showSection(SECTIONS_LIST.CHOOSE_NAMES)
})
//block scan
$("#scan .footer_button").on("click",function(){
    $("#scan .footer_button").addClass("disabled");
    $("#scan .footer_player").addClass("hidden");
    startCart(CARDS[GAME.current_card]);
    hideSection(SECTIONS_LIST.SCAN)
    showSection(SECTIONS_LIST.CARD)
})
//block card
$("#card .btn_yes").on("click",function(){
    accept()
})
$("#card .btn_no").on("click",function(){
    skip()
})
//block show
$("#show .next_button").on("click",function(){
    let card = CARDS[GAME.current_card];
    if(card.step < card.words.length-1) {
        card.step++;
        $("#card .card_img").css({
            "background-image":"url('"+card.words[card.step]+"')"
        })
        //$("#card .object").text(card.words[card.game_step])
        timer = 59;
        hideSection(SECTIONS_LIST.SHOW)
        showSection(SECTIONS_LIST.CARD)
        startTimer()
        sendMessageToApp('hideAll');
    }
    else {
        finish(card)
    }
})
//show all
$("#show_all .next_button").on("click",function(){
    hideSection(SECTIONS_LIST.SHOW_ALL)
    showSection(SECTIONS_LIST.NEXT);
    game_step = STEPS.NEXT;
    $(".instruction_1").addClass("hidden")
    $(".instruction_2").addClass("hidden")
    $(".instruction_3").addClass("hidden")
})
//next_game
$("#next_game .player_game").on("click",function(){
    let team_number = Number($(this).attr("data-index"));
    $("#next_game .player_game").removeClass("play_select")
    if(choosen_teams.includes(team_number)){
        GAME.current_team = team_number;
        $(this).addClass("play_select")
    }
    $("#next_game .next_button").removeClass("disabled")
})
$("#next_game .next_button").on("click",function(){
    $(this).addClass("disabled");
    continueGame();
    sendMessageToApp("scan")
    setTimeout(function(){
        hideSection(SECTIONS_LIST.NEXT)
        showSection(SECTIONS_LIST.SCAN)
        $(".instruction_card").removeClass("hidden");
    },1000)
})
//results
$("#results .btn-back").on("click",function(){
    hideSection(SECTIONS_LIST.RESULTS)

})

function hide_menu(){
    $("#menu").addClass("hidden")
}

$("#next_game .finish_button").on("click",function(){
    //hideSection(SECTIONS_LIST.NEXT)
    show_score()

})


let making_photo = false;
let making_video = false;
let photo_timer = 0;
function photo_tick(){
    photo_timer+= 0.03;
    if(photo_timer > 0.5 && making_photo){
        making_video = true;
        making_photo = false;
        $(".footer_game").addClass("video");
        sendMessageToApp("videoStart");
    }
    if(photo_timer > 30){
        if(making_photo) {
            making_photo = false;
            sendMessageToApp("photo");
        }
        if(making_video){
            making_video = false;
            sendMessageToApp("videoEnd");
        }
        $(".footer_game").removeClass("video");
    }
    setTimeout(function (){
        if(making_photo || making_video)
            photo_tick();
    },30)
}
$(".photo_button").on("touchstart",function () {
    photo_timer = 0;
    making_photo = true;
    photo_tick()
}).on("touchend touchcancel",function () {
    if(making_photo) {
        making_photo = false;
        sendMessageToApp("photo");
    }
    if(making_video){
        making_video = false;
        sendMessageToApp("videoStop");
    }
    $(".footer_game").removeClass("video");
});
$(".photo_button").on("touchstart",function () {
    making_photo = true;
    photo_tick()
    //sendMessageToApp("photo")
})
$(".btn-nav.btn-menu").on("click",function(){
    $("#menu").removeClass("hidden")
})

function play_again(){
    sendMessageToApp("reload");
    location.reload();
}
function show_score(){
    showSection(SECTIONS_LIST.RESULTS);
    let winner = -1;
    let max = 0;
    choosen_teams.forEach((t)=>{
        if(GAME["team"+t].score > max){
            winner = t;
            max = GAME["team"+t].score;
        }
    })
    $("#results .team"+winner).addClass("winner")
    sendMessageToApp("log winner "+winner)
}


let started = false;
let closeLoadingTimeout;
let instruactionTimeout;
window.addEventListener('message', (msg) => {
    let first_game = true;
    msg = msg.data;
    console.log("receiveMessage "+msg)
    //console.log(JSON.stringify(msg))
    switch (msg) {
        case "planeDetected":
            if(game_step == STEPS.SCAN_FLOOR) {
                game_step = STEPS.TAP_FLOOR;

                first_game = false;
                $(".instruction_place").addClass("hidden");
                $(".instruction_tap").removeClass("hidden");
                /*let once = false;
                $("body").on("click", function () {
                    if (!once) {
                        once = true;
                        $(".instruction_tap").addClass("hidden");
                        $(".instruction_place").addClass("hidden");
                        $("#scan .footer_button").removeClass("disabled");
                    }
                })*/
            }
            break;
    }
    if(msg.includes("onContentLoading")){
        let progress = Math.round((msg.split(" ")[1])*100);
        console.log("onContentLoading "+progress)
        $(".loadPage").removeClass("hidden");
        percentElement.innerText = progress + '%';
        progressLineElement.style.width = progress + '%';
        clearTimeout(closeLoadingTimeout);
    }
    if(msg.includes("onContentLoaded")){
        console.log("onContentLoaded");
        closeLoadingTimeout = setTimeout(function(){
            $(".loadPage").addClass("hidden");
        },1000)
    }
    if(msg.includes("cardDetected")){
        game_step = STEPS.SCAN_FLOOR;
        let num = Number(msg.split(" ")[1]);
        console.log("cardDetected "+num);
        setTimeout(function(){
            $(".instruction_card").addClass("hidden");
            sendMessageToApp("log game_step "+(game_step == STEPS.SCAN_FLOOR))
            if(game_step == STEPS.SCAN_FLOOR)
                $(".instruction_place").removeClass("hidden");
            if(!first_game) {
                setTimeout(function () {
                    $(".instruction_place").addClass("hidden");
                }, 3000)
            }
            let once = false;
            $("body").on("click", function () {
                if (!once) {
                    once = true;
                    $(".instruction_tap").addClass("hidden");
                    $(".instruction_place").addClass("hidden");
                    $("#scan .footer_player").removeClass("hidden");
                    $("#scan .footer_button").removeClass("disabled");
                }
            })
        },1000)
        GAME.current_card = num;
        //$(".loadPage").addClass("hidden");
    }
    if(msg.includes("scenePlaced")){
        sendMessageToApp("log "+"scenePlaced ")
    }
});
function sendMessageToApp(msg){
    window.parent.postMessage(msg, "*");
}
$(document).ready(function () {
    clearTimeout(closeLoadingTimeout)
    closeLoadingTimeout = setTimeout(function(){
        $(".loadPage").addClass("hidden");
    },1000)
})
// при включении экрана выбора персов
function playStartScreenAnimations() {
    let players = document.getElementById('choose_team').querySelectorAll('.player');
    players.forEach(player => player.classList.add("anim_in_player_quantity"));
    setTimeout(() => {
        players.forEach(player => player.classList.remove("anim_in_player_quantity"));
    }, 2000);
}
// при включении наименований персов 
function playTeamNameElement(elem) {
    let players = document.getElementById('names_form').querySelectorAll('.player_wrapper');
    players.forEach(player => player.classList.add("anim_player_letsname"));
    setTimeout(() => {
        players.forEach(player => player.classList.remove("anim_player_letsname"));
        let firtsPlayer = true;
        i = 0;
        while(firtsPlayer) {
            if(!players[i].querySelector('.player_name').classList.contains('hidden')) {
                players[i].querySelector('.player_name').classList.add('anim_first_player');
                setTimeout(() => {
                    players.forEach((player) => player.querySelector('.player_name').classList.remove('anim_first_player'));
                    players.forEach((player) => player.querySelector('.name_input').classList.remove('input_animation'));
                }, 4000);
                players[i].querySelector('.name_input').classList.add('input_animation')
                players[i].querySelector('.name_input').value = "Гномы";
                firtsPlayer = false;
                
            }
            i++;
        }
    }, 1000);
}

//при угадывании карточки анимация игрока и ротейшн баллов
function bounceLogoTeam() {
    let logo = document.getElementById('card').querySelector('.team_logo');
    logo.classList.add('anim');
    setTimeout(() =>{
        logo.classList.remove('anim');
    },2000)

    let score = document.getElementById('card').querySelector('.game_score');
    score.classList.add('anim');
    setTimeout(() =>{
        score.classList.remove('anim');
    },2000)
}
// звуки таймера
let music = document.getElementById('music');
let timerSound = document.getElementById('sound_timer');
function startTimerSound() {
    music.volume = 0.2;
    timerSound.play();
}
function stopTimerSound() {
    music.volume = 1;
    timerSound.pause();
}

//звуки кнопок 
let sounds = [
    'sounds/buttons/Button1.wav',
    'sounds/buttons/Button2.wav',
    'sounds/buttons/Button3.wav',
    'sounds/buttons/Button4.wav',
    'sounds/buttons/Button5.wav',
    'sounds/buttons/Button6.wav',
    'sounds/buttons/Button7.wav'
  ];

  function onPlayBtnSound() {
    var randomIndex = Math.floor(Math.random() * sounds.length);
    var audio = new Audio(sounds[randomIndex]);
    audio.play();
  }