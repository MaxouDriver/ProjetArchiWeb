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

