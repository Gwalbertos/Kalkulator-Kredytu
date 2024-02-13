let kapitał;
let Skapitał;
let lata;
let oprocentowanie;
let CK;
let OD;
let KwotaCK = [];
let KwotaOD = [];
let KwotaRa = [];
let PozKap = [];
let SpłRat = [];
let raty;
let Wrata;
let kl;
let całośćCK = 0;
let całośćOD = 0;
let Moproc;

function wczytanie() {
    kapitał = parseFloat(document.getElementById("Kapitał").value);
    Skapitał = parseFloat(document.getElementById("Kapitał").value);
    lata = parseFloat(document.getElementById("lata").value);
    oprocentowanie = parseFloat(document.getElementById("procent").value);
    raty = 12 * lata;
    Moproc = (oprocentowanie)/(12*100);
    KwotaCK = [];
    KwotaOD = [];
    KwotaRa = [];
    PozKap = [];
    SpłRat = [];
    CK = 0;
    OD = 0;
    całośćCK=0;
    całośćOD-0;

    if (document.getElementById("typRaty").value === "stała") {
        stały();
    } else if (document.getElementById("typRaty").value === "malejąca") {
        malejący();
    }
    generujTabele();
}

function stały() {
    if (kapitał && lata && oprocentowanie) {
        for (let i = 0; i < raty; i++) {
            Wrata = ((Skapitał*Moproc*Math.pow(1+Moproc,lata*12)))/(Math.pow(1+Moproc,lata*12)-1);
            CK = Wrata - kapitał*Moproc;
            OD = kapitał*Moproc;
            kapitał = kapitał - CK;
            KwotaCK.push(CK);
            PozKap.push( Skapitał -KwotaCK.reduce((accumulator, value) => accumulator + value, 0));
            KwotaOD.push(OD);
            KwotaRa.push(Wrata);
            SpłRat.push(KwotaOD.reduce((accumulator, value) => accumulator + value, 0) + KwotaCK.reduce((accumulator, value) => accumulator + value, 0));
        }
    }
}

function malejący(){
    if (kapitał && lata && oprocentowanie) {
        for (let i = 0; i < raty; i++) {
            CK = Skapitał / (lata * 12);
            KwotaCK.push(CK);
            OD = (Skapitał - i * CK) * (oprocentowanie / 100) / 12;
            Wrata = CK + OD;
            kapitał = kapitał - CK;
            PozKap.push( Skapitał -KwotaCK.reduce((accumulator, value) => accumulator + value, 0));
            KwotaOD.push(OD);
            KwotaRa.push(Wrata);
            SpłRat.push(KwotaOD.reduce((accumulator, value) => accumulator + value, 0) + KwotaCK.reduce((accumulator, value) => accumulator + value, 0));
        }
    }
}

 

function generujTabele() {
    let tabelaContainer = document.getElementById("tabela-container");
    let tabela = document.createElement("table");

    let naglowki = ["Numer Raty", "Kwota Kapitału", "Kwota Odsetek", "Rata","Spłacone Raty", "Pozostały Kapitał"];
    let naglowkiRow = tabela.insertRow(0);

    for (let i = 0; i < naglowki.length; i++) {
        let naglowek = document.createElement("th");
        naglowek.innerHTML = naglowki[i];
        naglowkiRow.appendChild(naglowek);
    }

    for (let i = 0; i < raty; i++) {
        let row = tabela.insertRow(i + 1);
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = KwotaCK[i].toFixed(2);
        row.insertCell(2).innerHTML = KwotaOD[i].toFixed(2);
        row.insertCell(3).innerHTML = KwotaRa[i].toFixed(2);
        row.insertCell(4).innerHTML = SpłRat[i].toFixed(2)
        row.insertCell(5).innerHTML = PozKap[i].toFixed(2);
    }

    tabelaContainer.innerHTML = "";
    tabelaContainer.appendChild(tabela);

}
