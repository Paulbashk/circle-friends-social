<template>
  <section class="main-content">
    <v-container>
      <v-row>
        <v-col cols="3">
          <layouts-sidebar />
        </v-col>
        <v-col cols="9">
          <slot></slot>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
