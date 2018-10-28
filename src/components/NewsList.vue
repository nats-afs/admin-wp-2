<template>
  <v-card>
    <v-card-title>
      Noticias
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Buscar" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-dialog v-model="dialog" max-width="1000px">
      <newsform :edit="edit" :item="item">
        <v-btn @click.native="close">cancelar</v-btn>
      </newsform>
    </v-dialog>
    <v-dialog v-model="modal" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Borrar Registro?</v-card-title>
        <v-card-text>Una vez eliminado el registro no hay vuelta atras</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="modal = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="deleteItem()">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="items" :search="search" :loading="loading" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td><v-icon v-if="props.item.featured" color="teal">star</v-icon></td>
        <td class="text-xs-right">{{ props.item.category }}</td>
        <td class="text-xs-right" v-html="props.item.description"></td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="confirm(props.item.uid)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        De {{ pageStart }} a {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { newsRef } from "../config/firebaseConfig";
import newsform from "./NewsForm";
export default {
  components: {
    newsform
  },
  data: () => ({
    loading:false,
    contain: true,
    tmp: "",
    search: "",
    pagination: {},
    dialog: false,
    modal: false,
    headers: [
      { text: "Titulo", align: "left", value: "title" },
      { text: "Destacado", align: "left", value: "featured" },
      { text: "Categoria", value: "category" },
      { text: "Descripcion", value: "description" },
      { text: "Fecha", value: "date" },
      { text: "Acciones", value: "name", sortable: false }
    ],
    items: [],
    edit: false,
    item: {},
    delete: null
  }),
  created() {
    this.loading = true;
    newsRef.on("value", snapshot => {
      this.fetchNews(snapshot.key, snapshot.val());
      this.loading = false;
    });
  },
  methods: {
    fetchNews(key, news) {
      this.items = [];
      for (let key in news) {
        this.items.push({
          uid: key,
          title: news[key].title,
          featured : news[key].featured,
          category: news[key].category,
          description: news[key].description,
          date: news[key].date,
          image: news[key].image
          // imagen: 7,
        });
      }
    },
    close() {
      this.dialog = false;
    },
    editItem(item) {
      this.item = item;
      this.edit = true;
      this.dialog = true;
    },
    confirm(item) {
      this.modal = true;
      this.delete = item;
    },
    deleteItem() {
      this.modal = false;
      newsRef
        .child(this.delete)
        .remove()
        .then(console.log("Registro eliminado"));
      this.delete = null;
    },
    previewImage(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.item.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>