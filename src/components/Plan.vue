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
    <v-btn color="error" dark class="mb-2" @click="intoDB()">저장하기</v-btn>
    <v-data-table
      :headers="headers"
      :items="desserts"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.time }}</td>
        <td class="text-xs-right">{{ props.item.peri }}</td>
        <td class="text-xs-right">{{ props.item.inter }}</td>
        <td class="text-xs-right">{{ props.item.t1 }}</td>
        <td class="text-xs-right">{{ props.item.t2 }}</td>
        <td class="text-xs-right">{{ props.item.t3 }}</td>
        <td class="text-xs-right">{{ props.item.t4 }}</td>
        <td class="text-xs-right">{{ props.item.t5 }}</td>
        <td class="text-xs-right">{{ props.item.t6 }}</td>
        <td class="text-xs-right">{{ props.item.t7 }}</td>
        <td class="text-xs-right">{{ props.item.t8 }}</td>
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
      headers: [
        {
          text: '시작시간',
          align: 'left',
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
      csvData: [],
      editedIndex: -1,
      editedItem: {
        time: '',
        peri: 0,
        inter: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        t5: 0,
        t6: 0,
        t7: 0,
        t8: 0
      },
      defaultItem: {
        time: '',
        peri: 0,
        inter: 0,
        t1: 0,
        t2: 0,
        t3: 0,
        t4: 0,
        t5: 0,
        t6: 0,
        t7: 0,
        t8: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
        this.close()
      }
      /*intoDB(){
        let mysql = require('mysql');
        let connection = mysql.createConnection({
          host: 'localhost',
          user: '<root>',
          password: '<tmxk0988>',
          port: '<3000>',
          database: 'plan'
        });

        connection.connect();

        connection.query('SELECT * from table1', function(err, rows, fields){
          if(!err){
            console.log('the solution:', rows);
          }
          else{
            console.log('Error', err);
          }
        });
        connection.end();
      }*/
    }
  }
</script>
