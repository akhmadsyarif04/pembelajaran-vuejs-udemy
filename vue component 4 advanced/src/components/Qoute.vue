<template>
    <div>
        <div class="title">
            <slot name="title"></slot>
            <span style="color: #ccc"><slot name="subtitle">The Subtitle</slot></span>
        </div>
        <hr>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
   
}
</script>

<style scoped>
    div {
        border: 1px solid #ccc;
        box-shadow: 1px 1px 2px black;
        padding: 30px;
        margin: 30px auto;
    }
    h2 {
        color: red;
    }
    .title {
        font-style: italic;
    }
</style>

slot adalah untuk meneruskan konten dari luar. dengan nasukan konten html diatara komponent buka dan tutup. lalu didalam komponen panggil dengan cara masukan komponen <slot></slote>
pada slot, dimana penulisan/konten berasal dari induk tapi untuk style mengubah konten dalam lingkup komponen slot harus dilakukan pada child.
akan tetapi selain itu misalkan teks konten berasal dari var data induk dan dilakukan penulisan output teks di induk seperti ini {{ teks }} maka tetap bisa jlan

jika ingin menamakan konten 1 per 1 sehingga bisa dengan mudah dipanggil dan disesuaikan tata letak pada komponen child. tinggal tambahkan slot="name" misal <h1 slot="title">Judul</h1> pada tag setiap konten yang di inginkan pada komponen induk
lalu pada komponen child memanggilnya dengan <slot name="title"></slot>

jika tedapat 2 slot, tetapi 1 slot tidak menggunakan nama. maka slot yang tidak memiliki nama akan dipanggil pada slot default <slot></slot> 
pada komponen induk :
<h2 slot="title">{{qouteTitle}}</h2>
<p>A wonderful qoute</p>

pada komponen child :
<slot name="titla"></slot> // yang memiliki nama akan diassign disini sesuai nama nya
<slot></slot> // yang tidak ada nama akan di assign disini, yaitu slot default