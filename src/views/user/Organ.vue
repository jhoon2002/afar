<template>
    <v-card>
        <v-card-title>
            조직
        </v-card-title>
        <v-sheet class="transparent">

            <v-treeview
                    v-model="selection"
                    :items="$_DATA.organs"
                    :search="search"
                    :filter="filter"
                    :selection-type="leaf === true ? 'leaf' : 'independent'"
                    :item-disabled="leaf === true ? 'false' : 'locked'"
                    selectable
                    return-object
                    open-all
                    dense
            ></v-treeview>

        </v-sheet>
    </v-card>
</template>