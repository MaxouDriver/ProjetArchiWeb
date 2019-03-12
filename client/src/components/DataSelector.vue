<template>
    <div>
        <v-container grid-list-md>
            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition"
                offset-y full-width max-width="290px" min-width="290px">
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="computedDateFormatted"
                    label="Date (read only text field)"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="event"
                    readonly
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
        </v-container>



        <v-card flat>
            <div class="headline text-xs-center pa-5">
                <v-data-table v-model="selected" :headers="headers" :items="desserts" :pagination.sync="pagination" select-all item-key="name" class="elevation-1">
                    <template v-slot:headers="props">
                    <tr>
                        <th>
                        <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details @click.stop="toggleAll"></v-checkbox>
                        </th>
                        <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']" @click="changeSort(header.value)">
                        <v-icon small>arrow_upward</v-icon>
                        {{ header.text }}
                        </th>
                    </tr>
                    </template>
                    <template v-slot:items="props">
                    <tr :active="props.selected" @click="props.selected = !props.selected">
                        <td>
                        <v-checkbox :input-value="props.selected" primary hide-details
                        ></v-checkbox>
                        </td>
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.calories }}</td>
                        <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td>
                        <td class="text-xs-right">{{ props.item.iron }}</td>
                    </tr>
                    </template>
                </v-data-table>
            </div>
            <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="transparent" >
                <v-btn color="teal" flat value="recent" >
                    <span>Morning</span>
                    <v-icon>history</v-icon>
                </v-btn>

                <v-btn color="teal" flat value="favorites"  >
                    <span>Afternoon</span>
                    <v-icon>favorite</v-icon>
                </v-btn>

                <v-btn color="teal" flat value="nearby" >
                    <span>Evening</span>
                    <v-icon>place</v-icon>
                </v-btn>
            </v-bottom-nav>
        </v-card>
    </div>
</template>