<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">일정추가</v-btn>

      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.time" label="시작시간"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.peri" label="주기"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.inter" label="연동"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.t1" label="현시1"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.t2" label="현시2"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.t3" label="현시3"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.t4" label="현시4"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.t5" label="현시5"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.t6" label="현시6"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.t7" label="현시7"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.t8" label="현시8"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="error" dark class="mb-2" @click="exportCSVFile(csvheaders, desserts, fileTitle)">저장하기</v-btn>

    <v-data-table
      :headers="headers"
      :items="desserts"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.time }}</td>
        <td class="text-xs-center">{{ props.item.peri }}</td>
        <td class="text-xs-center">{{ props.item.inter }}</td>
        <td class="text-xs-center">{{ props.item.t1 }}</td>
        <td class="text-xs-center">{{ props.item.t2 }}</td>
        <td class="text-xs-center">{{ props.item.t3 }}</td>
        <td class="text-xs-center">{{ props.item.t4 }}</td>
        <td class="text-xs-center">{{ props.item.t5 }}</td>
        <td class="text-xs-center">{{ props.item.t6 }}</td>
        <td class="text-xs-center">{{ props.item.t7 }}</td>
        <td class="text-xs-center">{{ props.item.t8 }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {

    data: () => ({
      dialog: false,
      csvheaders:
        {
          time: '시작시간',
          peri: '주기',
          inter: '연동',
          t1: '현시1',
          t2: '현시2',
          t3: '현시3',
          t4: '현시4',
          t5: '현시5',
          t6: '현시6',
          t7: '현시7',
          t8: '현시8'
        },
      headers: [
        {
          text: '시작시간',
          sortable: false,
          value: 'time'
        },
        { text: '주기', value: 'peri', sortable: false },
        { text: '연동', value: 'inter', sortable: false },
        { text: '현시1', value: 't1', sortable: false },
        { text: '현시2', value: 't2', sortable: false },
        { text: '현시3', value: 't3', sortable: false },
        { text: '현시4', value: 't4', sortable: false },
        { text: '현시5', value: 't5', sortable: false },
        { text: '현시6', value: 't6', sortable: false },
        { text: '현시7', value: 't7', sortable: false },
        { text: '현시8', value: 't8', sortable: false },
        { text: 'Actions', value: 'time', sortable: false }
      ],
      desserts: [],
      //csvData: [],
      editedIndex: -1,
      fileTitle: 'test',
      editedItem: {
        time: '',
        peri: '',
        inter: '',
        t1: '',
        t2: '',
        t3: '',
        t4: '',
        t5: '',
        t6: '',
        t7: '',
        t8: ''
      },
      defaultItem: {
        time: '',
        peri: '',
        inter: '',
        t1: '',
        t2: '',
        t3: '',
        t4: '',
        t5: '',
        t6: '',
        t7: '',
        t8: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '일정 추가' : '일정 수정'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            time: 0,
            peri: 159,
            inter: 6.0,
            t1: 24,
            t2: 4.0,
            t3: 0.1,
            t4: 0.2,
            t5: 0.3,
            t6: 0.4,
            t7: 0.5,
            t8: 0.6,
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('삭제하시겠습니까?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        console.log('111', this.desserts)
        const dataStr = JSON.stringify(this.desserts);
        console.log('json parse', dataStr)
        this.close()
      },

      convertToCSV(objArray){
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for(var i=0; i<array.length; i++){
          var line = '';
          for(var index in array[i]){
            if(line != ''){
              line += ',';
            }
            line += array[i][index];
          }
          str += line + '\r\n';
        }
        return str;
      },

      exportCSVFile(headers, items, fileTitle){
        //if(headers){
        //  items.unshift(headers);
        //}
        var item = new Array()
        for(var i=0; i < items.length; i++){
          item.push(items[i])
        }

        item.unshift(headers)
        var jsonObject = JSON.stringify(item);
        var csv = this.convertToCSV(jsonObject);
        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        var blob = new Blob([csv], {type: 'text/csv;charset-utf-8;'});
        if(navigator.msSaveBlob){
          navigator.msSaveBlob(blob, exportedFilenmae);
        }
        else{
          var link = document.createElement("a");
          if(link.download !== undefined){
            var url = URL.createObjectURL(blob);
            //link.setAttribute("href", url);
            link.setAttribute("href", "data:text/csv;charset=utf-8,\uFEFF" + encodeURI(csv));
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
        console.log('success')
        console.log('test', jsonObject)
        console.log('test1', csv)
        console.log('items', items)
      }
    }
  }
</script>
