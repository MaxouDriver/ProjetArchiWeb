<template>
    <section>
        <v-layout wrap>
            <v-flex xs12 class="mb-12">
            <v-sheet id="calendar" height="500">
                <v-calendar ref="calendar" v-model="start" type="4day" :end="end" color="primary"></v-calendar>
            </v-sheet>
            </v-flex>
        </v-layout>
    </section>
</template>

<script>
  export default {
    data: () => ({
      type: 'month',
      start: '2019-01-01',
      end: '2019-01-06',
      typeOptions: [
        { text: 'Day', value: 'day' },
        { text: '4 Day', value: '4day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
        { text: 'Custom Daily', value: 'custom-daily' },
        { text: 'Custom Weekly', value: 'custom-weekly' }
      ]
    })
  }
</script>
