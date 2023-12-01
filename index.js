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
    words: ["img/sketches/m1102_s.jpg",
            "img/sketches/m3_s.jpg",
            "img/sketches/m50_s.jpg"],
    guessed:[]
}, {
    step:0,
    words:
        ["Ваза",
            "Нога",
            "Телефон",
            "Дверь",
            "Яблоко",
            "Кондиционер",
            "Свитер",
            "Кровать",
            "Полотенце",
            "Носок"],
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
    $("#names_form .player_name, #whoms_first .player_game, #next_game .player_game, #results .player_score_menu").addClass("hidden");
    choosen_teams.forEach((t)=>{
        $("#names_form .team"+t+", #whoms_first .team"+t+", #next_game .team"+t+", #results .team"+t).removeClass("hidden");
        $("#results .team"+t+" p").text(teams[t]);
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
function finish(card){
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
$("#whoms_first .player_game").on("click",function(){
    let team_number = Number($(this).attr("data-index"));
    $("#whoms_first .player_game").removeClass("play_select")
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
    msg = msg.data;
    console.log("receiveMessage "+msg)
    //console.log(JSON.stringify(msg))
    switch (msg) {
        case "planeDetected":
            if(game_step == STEPS.SCAN_FLOOR) {
                game_step = STEPS.TAP_FLOOR;
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
        let progress = Number(msg.split(" ")[1])*100;
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
        let num = Number(msg.split(" ")[1])*100;
        console.log("cardDetected "+num);
        setTimeout(function(){
            sendMessageToApp("log game_step "+(game_step == STEPS.SCAN_FLOOR))
            if(game_step == STEPS.SCAN_FLOOR)
                $(".instruction_place").removeClass("hidden");
            setTimeout(function(){
                $(".instruction_place").addClass("hidden");
            },3000)
            let once = false;
            $("body").on("click", function () {
                if (!once) {
                    once = true;
                    $(".instruction_tap").addClass("hidden");
                    $(".instruction_place").addClass("hidden");
                    $("#scan .footer_button").removeClass("disabled");
                }
            })
        },1000)
        GAME.current_card = Number(num);
        //$(".loadPage").addClass("hidden");
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