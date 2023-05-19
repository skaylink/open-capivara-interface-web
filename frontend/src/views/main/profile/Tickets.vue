<template>
  <div>
    <v-toolbar light>
      <v-toolbar-title>
        List of tickets
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/main/profile/tickets/create">Create ticket</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="tickets">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.description }}</td>
        <td><v-icon v-if="props.item.target_sex_man">checkmark</v-icon></td>
        <td><v-icon v-if="props.item.target_sex_woman">checkmark</v-icon></td>
        <td class="justify-center layout px-0">
          <v-tooltip top>
            <span>Edit</span>
            <v-btn slot="activator" flat :to="{name: 'XXXXEDIT-COMPONENTXXXX', params: {id: props.item.id}}">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-tooltip>
        </td>
      </template>
    </v-data-table> 
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { ITicket } from '@/interfaces';
import { readTickets } from '@/store/main/getters';
import { dispatchActionGetTickets } from '@/store/main/actions';

@Component
export default class Ticket extends Vue {
  public headers = [
    {
      text: 'ID',
      sortable: true,
      value: 'id',
      align: 'left',
    },
    {
      text: 'Título',
      sortable: true,
      value: 'title',
      align: 'left',
    },

    {
      text: 'Descrição',
      sortable: true,
      value: 'description',
      align: 'left',
    },
  ];

  get tickets() {
    console.log(' TICKET LIST')
    //console.log(readTickets(this.$store)[0])
    return readTickets(this.$store);
  }
/* 
  public created() {
    console.log('[TICKETS] created')
    dispatchActionGetTickets(this.$store);
  } */
  public mounted() {
    console.log('[TICKETS] mounted')
    dispatchActionGetTickets(this.$store);
  }

}
</script>
