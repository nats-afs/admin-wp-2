<template>
  <v-card>
    <v-card-text>
      <v-alert color="success"
        icon="check_circle"
        :value="alert"
        transition="scale-transition">
        {{alertMessage}}
      </v-alert>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-container grid-list-xl>
        <v-layout row>
          <v-flex xs12>
            <v-form>
              <v-layout row>
                <v-flex xs6>
                  <v-text-field name="title"
                    label="Titulo"
                    v-model="item.title"
                    :error-messages="titleErrors"
                    :counter="40"
                    @input="$v.item.title.$touch()"
                    @blur="$v.item.title.$touch()"></v-text-field>
                  <v-select label="Categoria"
                    v-model="item.category"
                    :items="items"
                    :error-messages="categoryErrors"
                    @change="$v.item.category.$touch()"
                    @blur="$v.item.category.$touch()"></v-select>
                  <div class="input-group input-group--dirty input-group--text-field">
                    <label for="">Descripcion</label>
                    <div class="pt-2">
                      <quill-editor v-model="item.description"
                        class="editor"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
                      </quill-editor>
                    </div>
                  </div>
                  <!-- <v-text-field name="description"
                    label="Descripcion"
                    v-model="item.description"
                    :error-messages="descriptionErrors"
                    @input="$v.item.description.$touch()"
                    @blur="$v.item.description.$touch()"
                    multi-line></v-text-field> -->
                  <v-checkbox label="Destacar?"
                    v-model="item.featured"></v-checkbox>
                </v-flex>
                <v-flex xs6>
                  <v-card-text>
                    <input type="file"
                      name="image"
                      accept="image/jpeg, image/png"
                      @change="previewImage">
                    <v-card-media :src="item.image"
                      height="300px"
                      :contain=contain>
                    </v-card-media>
                  </v-card-text>
                </v-flex>
              </v-layout>
              <v-btn @click="submit">guardar</v-btn>
              <v-btn v-if="!edit"
                @click="clear">limpiar</v-btn>
              <slot></slot>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import moment from "moment";
import { newsRef, categoryRef } from "../config/firebaseConfig";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email
} from "vuelidate/lib/validators";
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: function() {
        return {
          image: null,
          featured: false
        };
      }
    }
  },
  mixins: [validationMixin],
  validations: {
    item: {
      title: { required, minLength: minLength(5), maxLength: maxLength(40) },
      description: { required, minLength: minLength(15) },
      category: { required }
    }
  },
  data: () => ({
    alert: false,
    contain: true,
    items: [],
    editorOption: {
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"]
        ],
        syntax: {
          highlight: text => hljs.highlightAuto(text).value
        }
      }
    }
    // checkbox: false
  }),
  methods: {
    // editor
    onEditorBlur(editor) {
      // console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      // console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      // console.log("editor ready!", editor);
    },
    submit() {
      this.$v.$touch();
      if (this.$v.item.$error) {
        console.log("Error de validacion");
        return;
      }
      this.edit ? this.editNews() : this.addNews();
    },
    addNews() {
      this.item.date = this.getdate;
      // var newsPostRef = newsRef.push(news);
      // news.uid = newsPostRef.key;
      newsRef.push(this.item).then(() => this.displayAlert());
      this.clear();
    },
    displayAlert() {
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 4000);
    },
    editNews() {
      this.item.date = this.getdate;
      newsRef
        .child(this.item.uid)
        .set(this.item)
        .then(() => this.displayAlert());
    },
    addCategory(id, data) {
      this.items.push(data.val().name);
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
    },
    clear() {
      this.$v.$reset();
      this.item.title = null;
      this.item.description = null;
      this.item.category = null;
      this.item.image = null;
      this.item.featured = false;
    }
  },
  created() {
    categoryRef.on("child_added", data => this.addCategory(data.key, data));
  },
  computed: {
    formTitle() {
      return !this.edit ? "Nueva Noticia" : "Editar Noticia";
    },
    alertMessage() {
      return !this.edit
        ? "Noticia guardada exitosamente"
        : "Noticia editada exitosamente";
    },
    getdate() {
      return moment().format("DD-MM-YYYY");
    },
    categoryErrors() {
      const errors = [];
      if (!this.$v.item.category.$dirty) return errors;
      !this.$v.item.category.required && errors.push("Categoria es requerida");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.$dirty) return errors;
      !this.$v.item.title.minLength &&
        errors.push("Titulo debe tener un minimo 5 caracteres");
      !this.$v.item.title.maxLength &&
        errors.push("Titulo debe tener un maximo de 40 caracteres");
      !this.$v.item.title.required && errors.push("Titulo es requerido.");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.item.description.$dirty) return errors;
      !this.$v.item.description.minLength &&
        errors.push("Descripcion debe tener un minimo de 15 caracteres");
      !this.$v.item.description.required &&
        errors.push("Descripcion de requerido");
      return errors;
    }
  }
};
</script>
<style lang="scss">
.editor {
  margin: initial !important;
}
</style>
