let rencana = JSON.parse(localStorage.getItem("rencana")) || [];

let indexEdit = -1;

let statustombol = "semua";

tampilkan();

function simpan() {
  localStorage.setItem("rencana", JSON.stringify(rencana));
}

function tampilkan() {
  let teks = "";
  let checked = "";

  for (let i = 0; i < rencana.length; i++) {
    let checked = "";

    if (rencana[i].selesai) {
      checked = "checked";
    }

    if (indexEdit !== i) {
      teks =
        teks +
        "<div class ='item'>" +
        "<input type = 'checkbox' class='chekbox' " +
        checked +
        " onclick='cheklist(" +
        i +
        ",0)'>" +
        "<div class ='teks-item'>" +
        "<span id ='tekscentang'>" +
        rencana[i].nama +
        "</span>" +
        "<span class='tekstgl'>" +
        rencana[i].id +
        "</span>" +
        "</div>" +
        "<div class ='klik'>" +
        "<button class ='edit'onclick ='Edit(" +
        i +
        ",0)' >Edit</button>" +
        "<button class ='hapus'onclick ='Hapus(" +
        i +
        ",0)' >Hapus</button>" +
        "</div>" +
        "</div>";
    } else {
      teks =
        teks +
        "<div class = 'items'>" +
        "<input id ='inputbaru' value='" +
        rencana[i].nama +
        "'>" +
        "<input type='date' id ='inputbarutgl' value='" +
        rencana[i].id +
        "'>" +
        "<div class ='kliked' >" +
        "<button class ='simpan' onclick='Simpan(" +
        i +
        ",0)'>Simpan</button>" +
        "</div>" +
        "</div>";
    }
  }
  document.getElementById("daftarrencana").innerHTML = teks;

  if (rencana.length <= 2) {
    document.getElementById("hapussemua").style.display = "none";
  } else {
    document.getElementById("hapussemua").style.display = "inline-block";
  }
}

function tambah() {
  let rencanaBaru = document.getElementById("tambahinput").value;

  let datetime = document.getElementById("datetime").value;

  if (rencanaBaru === "" || datetime === "") {
    document.getElementById("daftarrencana").textContent =
      "Input tidak boleh kosong";
    return;
  }

  for (let i = 0; i < rencana.length; i++) {
    if (rencana[i].nama === rencanaBaru && rencana[i].id === rencanaBaru) {
      sudahada = true;

      if (sudahada === true) {
        document.getElementById("daftarrencana").textContent =
          "Rencana sudah ada";
        return;
      }
    }
  }

  rencana.push({
    nama: rencanaBaru,
    id: datetime,
    selesai: false,
  });

  simpan();

  tampilkan();

  document.getElementById("tambahinput").value = "";
}

function Edit(index, kondisi) {
  indexEdit = index;

  if (kondisi === 1) {
    filterData();
  } else {
    tampilkan();
  }
}

function Simpan(index, kondisi) {
  let rencanabaru = document.getElementById("inputbaru").value;
  let rencanabarutgl = document.getElementById("inputbarutgl").value;
  rencana[index].nama = rencanabaru;
  rencana[index].id = rencanabarutgl;

  indexEdit = -1;

  simpan();
  if (kondisi === 1) {
    filterData();
  } else {
    tampilkan();
  }
}

function Hapus(index, kondisi) {
  rencana.splice(index, 1);

  simpan();
  if (kondisi === 1) {
    filterData();
  } else {
    tampilkan();
  }
}

function cheklist(index, kondisi) {
  rencana[index].selesai = !rencana[index].selesai;
  simpan();
  if (kondisi === 1) {
    filterData();
  } else {
    tampilkan();
  }
}

function hapussemua() {
  let yakin = confirm("Apakah anda yakin ingin hapus semua?");

  if (yakin) {
    rencana = [];
    simpan();
    tampilkan();
  }
}

function filterData(statusbaru) {
  if (statusbaru !== undefined && statusbaru !== "") {
    statustombol = statusbaru;
  }
  const text = document.getElementById("cari").value.toLowerCase();

  let hasil = rencana.filter((tugas) => {
    let cekteks = tugas.nama.toLowerCase().includes(text);

    let cekstatus = false;

    if (statustombol === "semua") cekstatus = true;
    if (statustombol === "belum" && tugas.selesai === false) cekstatus = true;
    if (statustombol === "sudah" && tugas.selesai === true) cekstatus = true;

    return cekteks && cekstatus;
  });

  const kotak = document.getElementById("daftarrencana");

  kotak.innerHTML = "";

  let teks = "";

  for (let i = 0; i < hasil.length; i++) {
    let indexsebenarnya = rencana.findIndex((rencanaasli) => {
      return (
        rencanaasli.nama === hasil[i].nama && rencanaasli.id === hasil[i].id
      );
    });
    let checked = "";

    if (hasil[i].selesai) {
      checked = "checked";
    }

    if (indexEdit !== indexsebenarnya) {
      teks =
        teks +
        "<div class ='item'>" +
        "<input type = 'checkbox' class='chekbox' " +
        checked +
        " onclick='cheklist(" +
        indexsebenarnya +
        " ,1)'>" +
        "<div class ='teks-item'>" +
        "<span id ='tekscentang'>" +
        hasil[i].nama +
        "</span>" +
        "<span class='tekstgl'>" +
        hasil[i].id +
        "</span>" +
        "</div>" +
        "<div class ='klik'>" +
        "<button class ='edit'onclick ='Edit(" +
        indexsebenarnya +
        ",1)' >Edit</button>" +
        "<button class ='hapus'onclick ='Hapus(" +
        indexsebenarnya +
        ",1)' >Hapus</button>" +
        "</div>" +
        "</div>";
    } else {
      teks =
        teks +
        "<div class = 'items'>" +
        "<input id ='inputbaru' value=' " +
        hasil[i].nama +
        "'>" +
        "<input type='date' id ='inputbarutgl' value=' " +
        hasil[i].id +
        "'>" +
        "<div class ='kliked' >" +
        "<button class ='simpan' onclick='Simpan(" +
        indexsebenarnya +
        " ,1)'>Simpan</button>" +
        "</div>" +
        "</div>";
    }
  }
  kotak.innerHTML = teks;
}
