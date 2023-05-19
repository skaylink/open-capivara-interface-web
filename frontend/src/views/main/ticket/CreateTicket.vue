<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3" v-if="!created">
      <v-card-title primary-title>
        <div class="headline primary--text">Create ticket</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Description" v-model="description" required></v-text-field>
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">
              Save
            </v-btn>
      </v-card-actions>
    </v-card>
    
    <v-card class="ma-3 pa-3" v-if="created">
      <v-card-title primary-title>
        <div class="headline primary--text">Ticket category</div>
      </v-card-title>
      <v-card-text>
        <div class="text--primary">
          Prediction: {{ result.category_prediction }}
        </div>
      </v-card-text>

      <v-card-title primary-title>
        <div class="headline primary--text">Topics in the message</div>
      </v-card-title>
      <v-card-text>
        <div class="text--primary">
          About softwares: {{ result.topics_softwares }} <br/>
          About locations: {{ result.topics_locations }} <br/>
          About dates: {{ result.topics_dates }} <br/>
          About others: {{ result.topics_others }} <br/> <br/>

          Main language: {{ result.language }} <br/>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="ma-3 pa-3" v-if="created">
      <div v-for="(item, index) in result.similar_ticktets" :key="index">
        <v-card-title primary-title>
          <div class="headline primary--text">Similar ticket {{ index+1 }}</div>
        </v-card-title>
        <v-card-text>
          <div class="text--primary">
            <bold>Title:</bold> {{ item.title }}
            </br></br>
            <bold>Description:</bold> {{ item.description }}
            </br></br>
            <bold>Solution:</bold> {{ item.solution }}
          </div>
          <template>
            <p></p>
          </template>
        </v-card-text>
      </div>
      <v-btn @click="feedback_like" :disabled="feedback_given"> These recommendation were useful :) </v-btn>
      <v-btn @click="feedback_dislike" :disabled="feedback_given"> These recommendation were NOT useful :( </v-btn>
    </v-card>

    <v-card class="ma-3 pa-3" v-if="created">
      <div v-for="(item, index) in result.suggested_solutions" :key="index">
        <v-card-title primary-title>
          <div class="headline primary--text">Suggested solution {{ index+1 }}</div>
        </v-card-title>
        <v-card-text>
          <div class="text--primary">
          {{ item[0] }}
          </div>
          <template>
            <p></p>
          </template>
        </v-card-text>
      </div>
    </v-card>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  IFeedbackCreate,
  ITicket,
  ITicketUpdate,
  ITicketCreate,
} from '@/interfaces';
import { dispatchActionCreateFeedback, dispatchActionGetTickets, dispatchActionCreateTicket } from '@/store/main/actions';
@Component
export default class CreateUser extends Vue {
  public description: string = '';
  public valid: boolean = false;
  public created: boolean = false;
  public feedback_given: boolean = false;
  public result: string = '';

  public async mounted() {
    /* await dispatchGetUsers(this.$store); */
    this.reset();
  }

  public reset() {
    this.description = '';
  }

  public cancel() {
    this.$router.back();
  }

  

  public async feedback_like() {
      const feedback: IFeedbackCreate = {
        score: 10,
        type: "UI-recommendation",
      };
      this.feedback_given = true;
      await dispatchActionCreateFeedback(this.$store, feedback).then((response) => {this.result=(response || 'no response')});
  }

  public async feedback_dislike() {
      const feedback: IFeedbackCreate = {
        score: 0,
        type: "UI-recommendation",
      };
      this.feedback_given = true;
      await dispatchActionCreateFeedback(this.$store, feedback).then((response) => {this.result=(response || 'no response')});
  }

  public async submit() {
      const ticket: ITicketCreate = {
        title: '',
        description: this.description,
      };

      this.created = true;
      await dispatchActionCreateTicket(this.$store, ticket).then((response) => {this.result=(response || 'no response')});

      //this.result = 'yhaaa';
      // this.$router.push('/main/profile/tickets');
  }
}
</script>
