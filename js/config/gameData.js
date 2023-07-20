//editable

let hearts = 10;
let melodyCTBasse = "";
let score = 0;
let scoreToDisplay = 0;
let enemiesSpawn = 0;
let bossSpawn = 0;
let damageProjectiles = 10;
let radiusBuildings = 250;
let speedProjectiles = 30;
let speedProjectilesBoss = 6;
let damageBoss1 = 1.421;
let damageBoss2 = 0.92;
let damageBoss3 = 0.517;
let musicBpm = 100;
let timeToMiddle = 0;

let speedSlowProjectiles = 3;
let attackTowerPrice = 50;
let slowTowerPrice = 50;
let coins = 50;
let coinsMultiplier = 1;
let coinsPerAttack = 0.1;

//difficulty :
let initSpeedEnemies = 0.8;
let initSpeedBosses = (musicBpm / 60) * 0.155;
let speedEnemies = initSpeedEnemies;
let speedBosses = initSpeedBosses;

// init
const filteredKeys = [
  " ",
  "Escape",
  "F1",
  "F2",
  "F3",
  "F4",
  "Dead",
  "Control",
  "Shift",
  "CapsLock",
  "Tab",
  "²",
  "Control",
  "Alt",
  "AltGraph",
  "Meta",
  "ContextMenu",
];
let fullscreenSet = false;
let currentPlayingTime = 0;
let informationShown = false;
let averageSpeed = 0;
let speedsLog = [];
let goodInCurrentGame = 0;
let missInCurrentGame = 0;
let totalHit = 0;
let hitPerSecond = 0;
let bestHitPerSecond = 0;
let enableToSetPause = true;
let DamageSecurity = false;
let focus = true;
let positionRectImgX = 0;
let positionRectImgY = 0;
let destroyed = false;
let activeShield = false;
let shieldsAnimation = [];
let bossFire = false;
let kickTrigger = false;
let finalBossPoisition = false;
let pressed = false;
let goodTiming = false;
let perfectTiming = false;
let frozen = false;
let bossWave = false;
let playerHit = false;
let gameOver = false;
let pause = false;
let rightkey = false;
let slowTowerOccupied = false;
let wave = 0;
let sendBossWaves = 0;
let bossEnemiesWave = false;
let waveEnded = true;
let bossMusicMiniKeys = ["a", "z", "e", "r"];
let bossMusicKeys = [];
let bossMusicNotes = [["C C D E D E D C C D"]];
let explosionsEnemy = [];
let explosionsPlayerHit = [];
let explosionsPlayerHitBoss = [];
let explosionsGameOver = [];
let explosionsArms = [];
let frozenEnemies = [];
let slowProjectiles = [];
let placementTiles = [];
let buildings = [];
let players = [];
let enemies = [];
let bosses = [];
let projectiles = [];
let projectilesBoss = [];
let activeTile = undefined;
let selectedTarget = null;
let isSelected = false;
let mouse = {
  x: undefined,
  y: undefined,
};
let goodEntry = 0;
let wrongEntry = 0;
let combo = 0;
//words list
let words = [];
const brutText = [
  "l'univers et le temps ont toujours fasciné l'humanité depuis des milliers d'années les êtres humains ont cherché à comprendre les mystères qui se cachent derrière ces concepts l'univers c'est l'ensemble de tout ce qui existe des galaxies lointaines aux plus petites particules subatomiques tout est inclus dans cet immense espace qui nous entoure pourtant malgré l'étendue de l'univers nous ne sommes qu'une petite partie de cet ensemble l'espace est l'une des dimensions les plus fondamentales de l'univers c'est un lieu où il n'y a ni matière ni énergie ni temps pourtant l'espace est loin d'être vide il est rempli de champs électromagnétiques de rayonnements cosmiques et de matière noire cette dernière bien que difficile à détecter est essentielle pour comprendre l'univers et sa structure le temps est une autre dimension fondamentale de l'univers c'est une mesure de la durée des événements du passé au présent et au futur le temps s'écoule de manière linéaire mais la relativité restreinte a montré que la perception du temps varie en fonction de la vitesse à laquelle on se déplace cela signifie que deux personnes qui se déplacent à des vitesses différentes peuvent avoir des perceptions différentes du temps l'univers l'espace et le temps sont intimement liés en effet l'espace et le temps sont indissociables formant ce que l'on appelle l'espace-temps cette fusion est essentielle pour comprendre l'univers et la gravité la théorie de la relativité générale d'albert einstein a montré que la gravité n'est pas une force comme les autres mais une courbure de l'espace-temps provoquée par la présence de matière le big bang est l'événement qui marque le début de l'univers tel que nous le connaissons cette explosion soudaine a libéré une immense quantité d'énergie qui a créé la matière et l'espace-temps depuis le big bang l'univers s'est étendu de manière continue formant des galaxies des étoiles et des planètes l'exploration de l'espace a été l'un des grands défis de l'humanité depuis les premiers pas sur la lune jusqu'aux missions les plus récentes sur mars les humains ont cherché à explorer les limites de notre système solaire et au-delà les missions spatiales ont permis de découvrir de nouvelles planètes de nouvelles galaxies et de nouvelles formes de vie mais l'espace reste encore largement inconnu et il reste de nombreux défis à relever pour en apprendre davantage sur l'univers l'univers l'espace et le temps sont des concepts complexes et fascinants bien que nous en sachions déjà beaucoup sur eux il reste encore beaucoup à découvrir grâce aux avancées technologiques et scientifiques nous pouvons espérer en apprendre encore plus sur les mystères qui se cachent derrière ces concepts l'exploration de l'espace est une entreprise difficile mais elle est essentielle pour comprendre notre place dans l'univers et les défis auxquels nous sommes confrontés L'univers et le temps ont captivé l'humanité depuis des milliers d'années Les êtres humains ont cherché à comprendre les mystères qui se cachent derrière ces concepts L'univers est l'ensemble de tout ce qui existe des galaxies lointaines aux plus petites particules subatomiques Tout est inclus dans cet immense espace qui nous entoure Pourtant malgré l'étendue de l'univers nous ne sommes qu'une petite partie de cet ensemble l'espace est l'une des dimensions les plus fondamentales de l'univers C'est un lieu où il n'y a ni matière ni énergie ni temps Pourtant l'espace est loin d'être vide il est rempli de champs électromagnétiques de rayonnements cosmiques et de matière noire cette dernière bien que difficile à détecter est essentielle pour comprendre l'univers et sa structurele temps est une autre dimension fondamentale de l'univers c'est une mesure de la durée des événements du passé au présent et au futur le temps s'écoule de manière linéaire mais la relativité restreinte a montré que la perception du temps varie en fonction de la vitesse à laquelle on se déplace cela signifie que deux personnes qui se déplacent à des vitesses différentes peuvent avoir des perceptions différentes du temps l'univers l'espace et le temps sont intimement liés En effet l'espace et le temps sont indissociables formant ce que l'on appelle l'espace-temps cette fusion est essentielle pour comprendre l'univers et la gravité la théorie de la relativité générale d'Albert Einstein a montré que la gravité n'est pas une force comme les autres mais une courbure de l'espace-temps provoquée par la présence de matière le big Bang est l'événement qui marque le début de l'univers tel que nous le connaissons cette explosion soudaine a libéré une immense quantité d'énergie qui a créé la matière et l'espace-temps Depuis le big Bang l'univers s'est étendu de manière continue formant des galaxies des étoiles et des planètes l'exploration de l'espace a été l'un des grands défis de l'humanité Depuis les premiers pas sur la lune jusqu'aux missions les plus récentes sur Mars les humains ont cherché à explorer les limites de notre système solaire et au-delà les missions spatiales ont permis de découvrir de nouvelles planètes de nouvelles galaxies et de nouvelles formes de vie mais l'espace reste encore largement inconnu et il reste de nombreux défis à relever pour en apprendre davantage sur l'univers l'espace et le temps sont des concepts complexes et fascinants bien que nous en sachions déjà beaucoup sur eux il reste encore beaucoup à découvrir grâce aux avancées technologiques et scientifiques nous pouvons espérer en apprendre encore plus sur les mystères qui se cachent derrière ces concepts l'exploration de l'espace est une entreprise difficile mais elle est essentielle pour comprendre notre place dans l'univers et les défis auxquels nous sommes confrontés l'univers et le temps ont toujours fasciné l'humanité depuis des milliers d'années les êtres humains ont cherché à comprendre les mystères qui se cachent derrière ces concepts l'univers c'est l'ensemble de tout ce qui existe des galaxies lointaines aux plus petites particules subatomiques tout est inclus dans cet immense espace qui nous entoure pourtant malgré l'étendue de l'univers nous ne sommes qu'une petite partie de cet ensemble l'espace est l'une des dimensions les plus fondamentales de l'univers c'est un lieu où il n'y a ni matière ni énergie ni temps pourtant l'espace est loin d'être vide il est rempli de champs électromagnétiques de rayonnements cosmiques et de matière noire cette dernière bien que difficile à détecter est essentielle pour comprendre l'univers et sa structure le temps est une autre dimension fondamentale de l'univers c'est une mesure de la durée des événements du passé au présent et au futur le temps s'écoule de manière linéaire mais la relativité restreinte a montré que la perception du temps varie en fonction de la vitesse à laquelle on se déplace cela signifie que deux personnes qui se déplacent à des vitesses différentes peuvent avoir des perceptions différentes du temps l'univers l'espace et le temps sont intimement liés en effet l'espace et le temps sont indissociables formant ce que l'on appelle l'espace-temps cette fusion est essentielle pour comprendre l'univers et la gravité la théorie de la relativité générale d'albert einstein a montré que la gravité n'est pas une force comme les autres mais une courbure de l'espace-temps provoquée par la présence de matière le big bang est l'événement qui marque le début de l'univers tel que nous le connaissons cette explosion soudaine a libéré une immense quantité d'énergie qui a créé la matière et l'espace-temps depuis le big bang l'univers s'est étendu de manière continue formant des galaxies des étoiles et des planètes l'exploration de l'espace a été l'un des grands défis de l'humanité depuis les premiers pas sur la lune jusqu'aux missions les plus récentes sur mars les humains ont cherché à explorer les limites de notre système solaire et au-delà les missions spatiales ont permis de découvrir de nouvelles planètes de nouvelles galaxies et de nouvelles formes de vie mais l'espace reste encore largement inconnu et il reste de nombreux défis à relever pour en apprendre davantage sur l'univers l'univers l'espace et le temps sont des concepts complexes et fascinants bien que nous en sachions déjà beaucoup sur eux il reste encore beaucoup à découvrir grâce aux avancées technologiques et scientifiques nous pouvons espérer en apprendre encore plus sur les mystères qui se cachent derrière ces concepts l'exploration de l'espace est une entreprise difficile mais elle est essentielle pour comprendre notre place dans l'univers et les défis auxquels nous sommes confrontés L'univers et le temps ont captivé l'humanité depuis des milliers d'années Les êtres humains ont cherché à comprendre les mystères qui se cachent derrière ces concepts L'univers est l'ensemble de tout ce qui existe des galaxies lointaines aux plus petites particules subatomiques Tout est inclus dans cet immense espace qui nous entoure Pourtant malgré l'étendue de l'univers nous ne sommes qu'une petite partie de cet ensemble l'espace est l'une des dimensions les plus fondamentales de l'univers C'est un lieu où il n'y a ni matière ni énergie ni temps Pourtant l'espace est loin d'être vide il est rempli de champs électromagnétiques de rayonnements cosmiques et de matière noire cette dernière bien que difficile à détecter est essentielle pour comprendre l'univers et sa structurele temps est une autre dimension fondamentale de l'univers c'est une mesure de la durée des événements du passé au présent et au futur le temps s'écoule de manière linéaire mais la relativité restreinte a montré que la perception du temps varie en fonction de la vitesse à laquelle on se déplace cela signifie que deux personnes qui se déplacent à des vitesses différentes peuvent avoir des perceptions différentes du temps l'univers l'espace et le temps sont intimement liés En effet l'espace et le temps sont indissociables formant ce que l'on appelle l'espace-temps cette fusion est essentielle pour comprendre l'univers et la gravité la théorie de la relativité générale d'Albert Einstein a montré que la gravité n'est pas une force comme les autres mais une courbure de l'espace-temps provoquée par la présence de matière le big Bang est l'événement qui marque le début de l'univers tel que nous le connaissons cette explosion soudaine a libéré une immense quantité d'énergie qui a créé la matière et l'espace-temps Depuis le big Bang l'univers s'est étendu de manière continue formant des galaxies des étoiles et des planètes l'exploration de l'espace a été l'un des grands défis de l'humanité Depuis les premiers pas sur la lune jusqu'aux missions les plus récentes sur Mars les humains ont cherché à explorer les limites de notre système solaire et au-delà les missions spatiales ont permis de découvrir de nouvelles planètes de nouvelles galaxies et de nouvelles formes de vie mais l'espace reste encore largement inconnu et il reste de nombreux défis à relever pour en apprendre davantage sur l'univers l'espace et le temps sont des concepts complexes et fascinants bien que nous en sachions déjà beaucoup sur eux il reste encore beaucoup à découvrir grâce aux avancées technologiques et scientifiques nous pouvons espérer en apprendre encore plus sur les mystères qui se cachent derrière ces concepts l'exploration de l'espace est une entreprise difficile mais elle est essentielle pour comprendre notre place dans l'univers et les défis auxquels nous sommes confrontés",
];
const brutTextBoss = [
  "il était une fois un méchant impitoyable qui régnait sur tout l'univers semant la destruction et la terreur partout où il allait il était une",
  "",
];

let increment = 1;
let start = 0;

for (let i = 0; i < brutText.length; i++) {
  let slicedText = brutText[i].split(" ");
  let waveWords = [];
  for (let j = 0; j < slicedText.length; j += increment * start) {
    let jIndex = j;
    let jCalc = j + increment + increment * start;
    let jTotal = jCalc - j;
    // console.log("slice depuis : ", jIndex, "vers", jCalc, " total : ", jTotal);
    let slice = slicedText.slice(jIndex, jCalc);

    waveWords.push(slice);
    start++;
  }
  words.push(waveWords);
  words = words[0];
}

// console.log(words);
let wordsEnemiesBoss = brutTextBoss[0].split(" "); // découpe la chaîne de caractères en mots individuels
