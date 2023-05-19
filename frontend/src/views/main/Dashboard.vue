<template>
  <v-container fluid>
    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Dashboard</div>
      </v-card-title>
      <v-card-text>
        <div class="headline font-weight-light ma-5">Welcome {{greetedUser}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn to="/main/profile/view">View Profile</v-btn>
        <v-btn to="/main/profile/edit">Edit Profile</v-btn>
        <v-btn to="/main/profile/password">Change Password</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Short term statistics</div>
      </v-card-title>
      <v-card-text v-if="result!=null">
        <ul>
        <li v-for="(value, name) in result['recent']" :key="name">
          {{ name }}: {{ value }}
        </li>
        </ul>
      </v-card-text>
    </v-card>


    <v-card class="ma-3 pa-3">
      <v-card-title primary-title>
        <div class="headline primary--text">Long term statistics</div>
      </v-card-title>
      <v-card-text v-if="result!=null">
        <ul>
        <li v-for="(value, name) in result['all']" :key="name" v-if="name!='Number of tickets per category'">
          {{ name }}: {{ value }}
        </li>
        </ul>
      </v-card-text>
      <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
    </v-card>
  </v-container>
</template>


<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store } from 'vuex';
import { readUserProfile } from '@/store/main/getters';
import { dispatchActionGetStatistics } from '@/store/main/actions';
import Highcharts from "highcharts";
import { Options } from "highcharts";

@Component
export default class Dashboard extends Vue {

  public result = null;

  public async mounted() {
    await dispatchActionGetStatistics(this.$store).then((response) => {this.result=(response || 'no response')});

    if (this.result!==null && this.result!=='no response'){
      const chartOptions: Highcharts.Options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Distribution of tickets per category'
        },
        subtitle: {
          text: 'Showing only the top 10, from the entire database'
        },
        xAxis: {
          categories: Object.keys(this.result['all']['Number of tickets per category']) as Array<any>,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0"></td>' +
            '<td style="padding:0"><b>{point.y:.0f} tickets</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false
          }
        },
        series: [{ 
          name: 'Number of tickets',
          type:undefined,
          data: Object.values(this.result['all']['Number of tickets per category']) as Array<any>  

        }] 
      }
      var chart = Highcharts.chart("container", chartOptions );
    } //end of chart plotting
  } //end of mounted


  get greetedUser() {
    const userProfile = readUserProfile(this.$store);
    if (userProfile) {
      if (userProfile.full_name) {
        return userProfile.full_name;
      } else {
        return userProfile.email;
      }
    }
  }
}
</script>
