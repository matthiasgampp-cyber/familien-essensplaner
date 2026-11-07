import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  ShoppingBag, 
  RotateCw, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Flame, 
  Clock, 
  AlertCircle, 
  UserCheck, 
  Check, 
  Utensils, 
  ChefHat,
  ChevronRight,
  Filter
} from 'lucide-react';

// STAMM-GERICHTE AUS DER VORLAGE UND GESUNDE ERGÄNZUNGEN
const INITIAL_RECIPES = [
  // Original Vorlage
  {
    id: '1',
    name: 'Spätzle mit Rahmsoße',
    category: 'Veggi / Mama Spezial',
    isMeat: false,
    isFish: false,
    calories: 520,
    prepTime: 25,
    kidsRating: 5,
    mamaOption: 'Mit gebackenem Rosenkohl & geschmolzenem Feta',
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: 'Feta wird im Ofen erhitzt/geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Spätzle', amount: 500, unit: 'g', category: 'Kühlregal' },
      { name: 'Gemüsebrühe / Rahmsoße', amount: 1, unit: 'Pck.', category: 'Vorrat' },
      { name: 'Rosenkohl', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Feta', amount: 150, unit: 'g', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },
  {
    id: '2',
    name: 'Brokkolisuppe mit Pfannenbrot',
    category: 'Suppe / Veggi',
    isMeat: false,
    isFish: false,
    calories: 410,
    prepTime: 20,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Brokkoli', amount: 600, unit: 'g', category: 'Gemüse' },
      { name: 'Kartoffeln', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Sahne / Pflanzensahne', amount: 150, unit: 'ml', category: 'Kühlregal' },
      { name: 'Mehl & Hefe (für Pfannenbrot)', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '3',
    name: 'Spaghetti Bolognese (mager)',
    category: 'Klassiker',
    isMeat: true,
    isFish: false,
    calories: 580,
    prepTime: 35,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: 'Tomatensauce ist verarbeitet und für alle okay.',
    cheeseNote: null,
    ingredients: [
      { name: 'Spaghetti (Vollkorn)', amount: 400, unit: 'g', category: 'Vorrat' },
      { name: 'Rinderhackfleisch (mager)', amount: 400, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Passierte Tomaten', amount: 2, unit: 'Dosen', category: 'Vorrat' },
      { name: 'Möhren & Sellerie', amount: 200, unit: 'g', category: 'Gemüse' }
    ],
    fromOriginalList: true
  },
  {
    id: '4',
    name: 'Reis mit Butter-Chicken',
    category: 'Geflügel',
    isMeat: true,
    isFish: false,
    calories: 550,
    prepTime: 30,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: 'Tomatensauce eingekocht (erlaubt).',
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenbrustfilet', amount: 500, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Basmati Reis', amount: 300, unit: 'g', category: 'Vorrat' },
      { name: 'Stückige Tomaten (verarbeitet)', amount: 1, unit: 'Dose', category: 'Vorrat' },
      { name: 'Kokosmilch (light)', amount: 200, unit: 'ml', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '5',
    name: 'Fisch, Spinat & Kartoffelpüree',
    category: 'Fisch / Seefisch',
    isMeat: false,
    isFish: true,
    calories: 460,
    prepTime: 30,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: 'Gegrilltes Hähnchenbrustfilet oder Bio-Tofu-Leberkäse',
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Kabeljau / Seelachsfilet (für 3 Pers.)', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Hähnchenbrust / Tofu (für 1 Pers. Ausweich)', amount: 150, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Blattspinat (TK)', amount: 450, unit: 'g', category: 'Gemüse' },
      { name: 'Kartoffeln', amount: 800, unit: 'g', category: 'Gemüse' },
      { name: 'Milch', amount: 100, unit: 'ml', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },
  {
    id: '6',
    name: 'Gefüllte Paprika mit Reis',
    category: 'Gemüse & Fleisch',
    isMeat: true,
    isFish: false,
    calories: 490,
    prepTime: 40,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Große Paprika', amount: 4, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Hackfleisch gemischt (mager)', amount: 350, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Reis', amount: 250, unit: 'g', category: 'Vorrat' },
      { name: 'Tomatensoße (gekocht)', amount: 400, unit: 'ml', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '7',
    name: 'Knusprige Pizza / Flammkuchen',
    category: 'Wochenende',
    isMeat: false,
    isFish: false,
    calories: 620,
    prepTime: 30,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: true,
    tomatoNote: 'Verarbeitete Pizzen-Tomatensauce ist OK. Keine frischen Tomatenscheiben als Belag für 1 Pers.',
    cheeseNote: 'Käse wird im Ofen komplett geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Pizzateig / Flammkuchenteig', amount: 2, unit: 'Pck.', category: 'Kühlregal' },
      { name: 'Passierte Tomaten / Schmand', amount: 1, unit: 'Becher', category: 'Kühlregal' },
      { name: 'Geriebener Käse (light)', amount: 200, unit: 'g', category: 'Kühlregal' },
      { name: 'Belag (Paprika, Schinken, Pilze)', amount: 1, unit: 'Mix', category: 'Gemüse' }
    ],
    fromOriginalList: true
  },
  {
    id: '8',
    name: 'Maultaschen mit Salat',
    category: 'Veggi / Schwäbisch',
    isMeat: false,
    isFish: false,
    calories: 510,
    prepTime: 20,
    kidsRating: 5,
    mamaOption: 'Mit gebratener Paprika',
    fishAlternative: null,
    freshTomatoWarning: true,
    tomatoNote: 'Salat ohne frische Tomaten zubereiten (z.B. Gurken-Kräuter-Salat).',
    cheeseNote: null,
    ingredients: [
      { name: 'Maultaschen (Gemüse oder Fleisch)', amount: 2, unit: 'Pck.', category: 'Kühlregal' },
      { name: 'Paprika', amount: 2, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Gemischter Salat & Gurke', amount: 1, unit: 'Set', category: 'Gemüse' }
    ],
    fromOriginalList: true
  },
  {
    id: '9',
    name: 'Kürbissuppe mit Pfannenbrot',
    category: 'Suppe / Saison',
    isMeat: false,
    isFish: false,
    calories: 390,
    prepTime: 25,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hokkaido-Kürbis', amount: 1, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Möhren', amount: 2, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Kokosmilch (light)', amount: 200, unit: 'ml', category: 'Vorrat' },
      { name: 'Mehl & Hefe (Pfannenbrot)', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '10',
    name: 'Fusilli Haschee',
    category: 'Pasta',
    isMeat: true,
    isFish: false,
    calories: 560,
    prepTime: 25,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: 'Eingekochte Sauce (erlaubt).',
    cheeseNote: null,
    ingredients: [
      { name: 'Fusilli Pasta', amount: 400, unit: 'g', category: 'Vorrat' },
      { name: 'Rinderhackfleisch', amount: 400, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Zwiebeln & Knoblauch', amount: 1, unit: 'Set', category: 'Gemüse' },
      { name: 'Rinderbrühe & Tomatenmark', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '11',
    name: 'Hähnchen-Curry-Pfanne mit Reis',
    category: 'Geflügel',
    isMeat: true,
    isFish: false,
    calories: 520,
    prepTime: 30,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenbrust', amount: 500, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Ananas / Erbsen / Zucchini', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Reis', amount: 300, unit: 'g', category: 'Vorrat' },
      { name: 'Currysoße (mild)', amount: 1, unit: 'Glas', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '12',
    name: 'Fisch, süße Möhren-Erbsen & Kartoffeln',
    category: 'Fisch',
    isMeat: false,
    isFish: true,
    calories: 440,
    prepTime: 25,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: 'Gegrillte Putenbruststreifen',
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Lachs / Schollenfilet (für 3 Pers.)', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Putenbrust (für 1 Pers. Ausweich)', amount: 150, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Möhren & Erbsen (TK/Frisch)', amount: 500, unit: 'g', category: 'Gemüse' },
      { name: 'Festkochende Kartoffeln', amount: 800, unit: 'g', category: 'Gemüse' }
    ],
    fromOriginalList: true
  },
  {
    id: '13',
    name: 'Klassische Hühnersuppe',
    category: 'Suppe / Geflügel',
    isMeat: true,
    isFish: false,
    calories: 420,
    prepTime: 45,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Suppenhuhn / Hähnchenkeulen', amount: 600, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Suppengrün (Möhren, Sellerie, Porree)', amount: 1, unit: 'Bund', category: 'Gemüse' },
      { name: 'Suppennudeln', amount: 150, unit: 'g', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '14',
    name: 'Selbstgemachte Hamburger mit Pommes',
    category: 'Wochenende',
    isMeat: true,
    isFish: false,
    calories: 640,
    prepTime: 35,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: true,
    tomatoNote: '1 Burger ohne frische Tomatenscheibe servieren (Ketchup/Burgersauce ist OK).',
    cheeseNote: 'Cheddar/Schmelzkäse wird auf dem Patty geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Burger Buns (Vollkorn)', amount: 4, unit: 'Stk.', category: 'Vorrat' },
      { name: 'Rinder-Patties (mager)', amount: 4, unit: 'Stk.', category: 'Fleisch & Fisch' },
      { name: 'Ofen-Pommes / Süßkartoffel-Pommes', amount: 600, unit: 'g', category: 'Kühlregal' },
      { name: 'Salat, Gurken, Gewürzgurken', amount: 1, unit: 'Mix', category: 'Gemüse' }
    ],
    fromOriginalList: true
  },
  {
    id: '15',
    name: 'Tortellini mit Rahm- oder Tomatensauce',
    category: 'Pasta / Veggi',
    isMeat: false,
    isFish: false,
    calories: 530,
    prepTime: 15,
    kidsRating: 5,
    mamaOption: 'Mit überbackenem Blumenkohl (Gratinkäse im Ofen geschmolzen)',
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: 'Sauce ist verarbeitet (erlaubt).',
    cheeseNote: 'Gratinkäse ist im Ofen geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Ricotta-Spina-Tortellini', amount: 500, unit: 'g', category: 'Kühlregal' },
      { name: 'Tomaten- oder Rahmsoße', amount: 400, unit: 'ml', category: 'Vorrat' },
      { name: 'Blumenkohl', amount: 1, unit: 'Kopf', category: 'Gemüse' },
      { name: 'Reibekäse zum Überbacken', amount: 100, unit: 'g', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },
  {
    id: '16',
    name: 'Spinatsuppe mit Pfannenbrot',
    category: 'Suppe / Veggi',
    isMeat: false,
    isFish: false,
    calories: 400,
    prepTime: 20,
    kidsRating: 3,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Rahmspinat / Blattspinat', amount: 500, unit: 'g', category: 'Gemüse' },
      { name: 'Kartoffeln', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Mehl & Hefe (Pfannenbrot)', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '17',
    name: 'Klassische Lasagne Bolognese',
    category: 'Pasta / Ofen',
    isMeat: true,
    isFish: false,
    calories: 590,
    prepTime: 50,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: 'Gekochte Bolognese-Sugo ist erlaubt.',
    cheeseNote: 'Gratinkäse ist im Ofen überbacken (erlaubt).',
    ingredients: [
      { name: 'Lasagneplatten', amount: 1, unit: 'Pck.', category: 'Vorrat' },
      { name: 'Rinderhackfleisch (mager)', amount: 400, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Passierte Tomaten', amount: 2, unit: 'Dosen', category: 'Vorrat' },
      { name: 'Bechamel & Reibekäse', amount: 1, unit: 'Set', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },
  {
    id: '18',
    name: 'Hähnchen-Paprika-Pfanne mit Reis',
    category: 'Geflügel',
    isMeat: true,
    isFish: false,
    calories: 490,
    prepTime: 25,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenbrust', amount: 500, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Bunte Paprika', amount: 3, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Langkornreis', amount: 300, unit: 'g', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '19',
    name: 'Fisch, grüne Bohnen & Bratkartoffeln',
    category: 'Fisch',
    isMeat: false,
    isFish: true,
    calories: 470,
    prepTime: 30,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: 'Überbackener Halloumi (gebraten/gebacken) oder Puten-Schnitzel',
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: 'Halloumi wird kross gebraten (erlaubt).',
    ingredients: [
      { name: 'Fischfilet nach Wahl (für 3 Pers.)', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Halloumi / Schnitzel (für 1 Pers. Ausweich)', amount: 150, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Grüne Bohnen', amount: 400, unit: 'g', category: 'Gemüse' },
      { name: 'Festkochende Kartoffeln', amount: 800, unit: 'g', category: 'Gemüse' }
    ],
    fromOriginalList: true
  },
  {
    id: '20',
    name: 'Paella mit Hähnchen',
    category: 'Geflügel / Reispfanne',
    isMeat: true,
    isFish: false,
    calories: 510,
    prepTime: 35,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenbrust / Keulen-Fleisch', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Paella-Reis', amount: 300, unit: 'g', category: 'Vorrat' },
      { name: 'Erbsen & Zucchini', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Saffran / Kurkuma', amount: 1, unit: 'Pck.', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '21',
    name: 'Überbackene Süßkartoffeln',
    category: 'Veggi / Ofen',
    isMeat: false,
    isFish: false,
    calories: 430,
    prepTime: 40,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: 'Gouda / Käse wird im Ofen knusprig überbacken (erlaubt).',
    ingredients: [
      { name: 'Große Süßkartoffeln', amount: 4, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Kichererbsen & Mais', amount: 1, unit: 'Dose', category: 'Vorrat' },
      { name: 'Quark / Sour Cream', amount: 200, unit: 'g', category: 'Kühlregal' },
      { name: 'Reibekäse', amount: 100, unit: 'g', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },
  {
    id: '22',
    name: 'Gemüsesuppe mit Dampfnudeln',
    category: 'Suppe / Süß & Herzhaft',
    isMeat: false,
    isFish: false,
    calories: 500,
    prepTime: 35,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Suppengemüse (Möhren, Sellerie, Lauch)', amount: 600, unit: 'g', category: 'Gemüse' },
      { name: 'Dampfnudeln (Kühlregal/TK)', amount: 4, unit: 'Stk.', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },
  {
    id: '23',
    name: 'Pasta con Albondigas (Hackbällchen in Tomaten-Sugo)',
    category: 'Pasta / Fleisch',
    isMeat: true,
    isFish: false,
    calories: 570,
    prepTime: 30,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: 'Eingekochte Tomatensauce ist vollkommen OK.',
    cheeseNote: null,
    ingredients: [
      { name: 'Penne oder Spaghetti', amount: 400, unit: 'g', category: 'Vorrat' },
      { name: 'Rinderhackbällchen', amount: 350, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Fruchtige Tomatensoße', amount: 500, unit: 'ml', category: 'Vorrat' }
    ],
    fromOriginalList: true
  },
  {
    id: '24',
    name: 'Kurkuma-Chicken-Pfanne mit Reis',
    category: 'Geflügel',
    isMeat: true,
    isFish: false,
    calories: 480,
    prepTime: 25,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenbrust', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Basmati Reis', amount: 300, unit: 'g', category: 'Vorrat' },
      { name: 'Zucchini & Möhren', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Kurkuma & Joghurtsoße', amount: 1, unit: 'Set', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },
  {
    id: '25',
    name: 'Fisch, Brokkoli & Kartoffelgratin',
    category: 'Fisch / Gratiniert',
    isMeat: false,
    isFish: true,
    calories: 490,
    prepTime: 35,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: 'Geflügel-Frikadellen oder Veggie-Patty',
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: 'Gratinkäse im Ofen geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Lachs / Dorschfilet (für 3 Pers.)', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Geflügelfrikadelle (für 1 Pers. Ausweich)', amount: 1, unit: 'Stk.', category: 'Fleisch & Fisch' },
      { name: 'Brokkoli', amount: 400, unit: 'g', category: 'Gemüse' },
      { name: 'Kartoffeln & Gratinsoße', amount: 1, unit: 'Set', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },
  {
    id: '26',
    name: 'Ofenhähnchen mit Pommes',
    category: 'Geflügel / Klassiker',
    isMeat: true,
    isFish: false,
    calories: 590,
    prepTime: 40,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenkeulen / Unterkeulen', amount: 8, unit: 'Stk.', category: 'Fleisch & Fisch' },
      { name: 'Backofen-Pommes', amount: 600, unit: 'g', category: 'Kühlregal' },
      { name: 'Gurkensalat', amount: 1, unit: 'Stk.', category: 'Gemüse' }
    ],
    fromOriginalList: true
  },
  {
    id: '27',
    name: 'Mais-Wraps (Fajita Style)',
    category: 'Mexikanisch',
    isMeat: true,
    isFish: false,
    calories: 510,
    prepTime: 20,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: true,
    tomatoNote: 'Mildes Tomatenmark / verarbeitete Salsa OK. Keine frischen Tomatenstücke für 1 Pers.',
    cheeseNote: 'Käse schmilzt in den heißen Wraps (erlaubt).',
    ingredients: [
      { name: 'Tortilla / Mais-Wraps', amount: 8, unit: 'Stk.', category: 'Vorrat' },
      { name: 'Hähnchenstreifen oder Hack', amount: 350, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Mais, Bohnen, Paprika', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Geriebener Käse & Salsa', amount: 1, unit: 'Set', category: 'Kühlregal' }
    ],
    fromOriginalList: true
  },

  // Ergänzende gesunde Gerichte (Strikte Einhaltung der Regeln: Keine frischen Tomaten, kein roher Käse)
  {
    id: '28',
    name: 'Ofen-Gnocchi mit Kräuter-Cream & Brokkoli',
    category: 'Veggi / Schnelles Blech',
    isMeat: false,
    isFish: false,
    calories: 460,
    prepTime: 20,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: 'Ohne Tomaten (Milde Kräuter-Frischkäse-Sauce).',
    cheeseNote: 'Gouda im Ofen geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Gnocchi (Kühlregal)', amount: 500, unit: 'g', category: 'Kühlregal' },
      { name: 'Brokkoli-Röschen', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Kräuter-Frischkäse (erhitzt)', amount: 150, unit: 'g', category: 'Kühlregal' },
      { name: 'Reibekäse zum Überbacken', amount: 100, unit: 'g', category: 'Kühlregal' }
    ],
    fromOriginalList: false
  },
  {
    id: '29',
    name: 'Puten-Geschnetzeltes mit Rösti',
    category: 'Geflügel',
    isMeat: true,
    isFish: false,
    calories: 520,
    prepTime: 30,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Putenbruststreifen', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Champignons', amount: 250, unit: 'g', category: 'Gemüse' },
      { name: 'Kartoffel-Rösti (TK/Frisch)', amount: 600, unit: 'g', category: 'Kühlregal' },
      { name: 'Rahmsoße', amount: 1, unit: 'Pck.', category: 'Vorrat' }
    ],
    fromOriginalList: false
  }
];

const DAYS_OF_WEEK = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

export default function App() {
  const [activeTab, setActiveTab] = useState('plan'); // 'plan', 'shopping', 'recipes'
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [favorites, setFavorites] = useState(['3', '7', '14', '15', '26']); // Preset favorite IDs
  
  // History tracking for 14-day rule (simulated history + current plan)
  const [historyIds, setHistoryIds] = useState(['2', '4', '8', '11', '13', '18', '20']);
  const [currentWeekPlan, setCurrentWeekPlan] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Helper: Get available recipes filtering 14-day history
  const getEligibleRecipes = (excludeIds = [], meatCountCurrent = 0, maxMeat = 4) => {
    const allBlockedIds = new Set([...historyIds, ...excludeIds]);
    
    let eligible = recipes.filter(r => !allBlockedIds.has(r.id));
    
    // If pool gets exhausted due to strict history, fallback to allow non-current week items
    if (eligible.length < 3) {
      eligible = recipes.filter(r => !excludeIds.includes(r.id));
    }

    // Filter by meat rule if quota reached
    if (meatCountCurrent >= maxMeat) {
      eligible = eligible.filter(r => !r.isMeat);
    }
    
    return eligible;
  };

  // Generate 7-day meal plan ensuring 3-4 meat days and 14-day no-repeat constraint
  const generateWeeklyPlan = () => {
    let plan = [];
    let selectedIds = [];
    let meatCount = 0;

    // Target 3 or 4 meat days
    const targetMeatDays = Math.random() > 0.5 ? 3 : 4;

    for (let i = 0; i < 7; i++) {
      let candidatePool = getEligibleRecipes(selectedIds, meatCount, targetMeatDays);
      
      // If we still need meat days towards the end of the week, force meat dishes
      const remainingDays = 7 - i;
      const neededMeat = targetMeatDays - meatCount;
      if (neededMeat > 0 && remainingDays <= neededMeat) {
        const meatPool = candidatePool.filter(r => r.isMeat);
        if (meatPool.length > 0) candidatePool = meatPool;
      }

      // Favor favorite dishes with 2x probability weight
      let weightedPool = [];
      candidatePool.forEach(r => {
        weightedPool.push(r);
        if (favorites.includes(r.id)) {
          weightedPool.push(r);
        }
      });

      const selected = weightedPool[Math.floor(Math.random() * weightedPool.length)] || recipes[0];
      
      if (selected.isMeat) {
        meatCount++;
      }

      plan.push({
        day: DAYS_OF_WEEK[i],
        meal: selected
      });
      selectedIds.push(selected.id);
    }

    setCurrentWeekPlan(plan);
  };

  // Re-roll a single day with auto recalculated meat ratio and immediate shopping list update
  const rerollDay = (dayIndex) => {
    const currentMeatCount = currentWeekPlan.reduce((acc, curr, idx) => {
      if (idx === dayIndex) return acc;
      return acc + (curr.meal.isMeat ? 1 : 0);
    }, 0);

    const otherSelectedIds = currentWeekPlan
      .filter((_, idx) => idx !== dayIndex)
      .map(p => p.meal.id);

    // Max 4 meat dishes allowed per week
    const candidatePool = getEligibleRecipes(otherSelectedIds, currentMeatCount, 4);

    let weightedPool = [];
    candidatePool.forEach(r => {
      weightedPool.push(r);
      if (favorites.includes(r.id)) weightedPool.push(r);
    });

    const newMeal = weightedPool[Math.floor(Math.random() * weightedPool.length)] || recipes[0];

    const updatedPlan = [...currentWeekPlan];
    updatedPlan[dayIndex] = {
      ...updatedPlan[dayIndex],
      meal: newMeal
    };

    setCurrentWeekPlan(updatedPlan);
  };

  // Auto-generate on initial render
  useEffect(() => {
    generateWeeklyPlan();
  }, []);

  // Toggle Favorite
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Calculate current week statistics
  const weekStats = useMemo(() => {
    const meatDays = currentWeekPlan.filter(p => p.meal?.isMeat).length;
    const fishDays = currentWeekPlan.filter(p => p.meal?.isFish).length;
    const vegDays = 7 - meatDays - fishDays;
    const avgCalories = Math.round(
      currentWeekPlan.reduce((acc, p) => acc + (p.meal?.calories || 0), 0) / 7
    );

    return { meatDays, fishDays, vegDays, avgCalories };
  }, [currentWeekPlan]);

  // Consolidate Shopping List Items grouped by Supermarket Categories
  const shoppingList = useMemo(() => {
    const categories = {
      'Gemüse': [],
      'Fleisch & Fisch': [],
      'Kühlregal': [],
      'Vorrat': []
    };

    currentWeekPlan.forEach(dayPlan => {
      if (!dayPlan.meal) return;
      dayPlan.meal.ingredients.forEach(ing => {
        const cat = categories[ing.category] ? ing.category : 'Vorrat';
        const existingIndex = categories[cat].findIndex(item => item.name.toLowerCase() === ing.name.toLowerCase());

        if (existingIndex > -1) {
          categories[cat][existingIndex].amount += ing.amount;
        } else {
          categories[cat].push({
            id: `${ing.name}-${ing.category}`,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            category: cat
          });
        }
      });
    });

    return categories;
  }, [currentWeekPlan]);

  const toggleCheckIngredient = (id) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* HEADER SECTION */}
      <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-lg sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
              <ChefHat className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Familien Essensplaner</h1>
              <p className="text-xs text-teal-100 flex items-center gap-2 mt-0.5">
                <span>2 Erwachsene, 2 Kinder</span> • 
                <span className="text-emerald-200">Gesund & Kalorienbewusst</span>
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex items-center bg-black/15 p-1 rounded-xl backdrop-blur-sm self-start md:self-auto">
            <button
              onClick={() => setActiveTab('plan')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'plan' ? 'bg-white text-teal-800 shadow-md' : 'text-teal-100 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Wochenplan</span>
            </button>

            <button
              onClick={() => setActiveTab('shopping')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'shopping' ? 'bg-white text-teal-800 shadow-md' : 'text-teal-100 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Einkaufsliste</span>
            </button>

            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'recipes' ? 'bg-white text-teal-800 shadow-md' : 'text-teal-100 hover:text-white'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Rezepte</span>
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 pt-6">

        {/* TAB 1: WOCHENPLAN */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            
            {/* STATS & CONTROL BAR */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5">
                  <span className="text-xs text-emerald-700 font-medium block">Fleischtage</span>
                  <span className="text-xl font-bold text-emerald-900">{weekStats.meatDays} / 7</span>
                  <span className="text-[10px] text-emerald-600 block">(Ziel: 3-4x)</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5">
                  <span className="text-xs text-blue-700 font-medium block">Fischtage</span>
                  <span className="text-xl font-bold text-blue-900">{weekStats.fishDays} / 7</span>
                  <span className="text-[10px] text-blue-600 block">(mit Alternative)</span>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-2.5">
                  <span className="text-xs text-teal-700 font-medium block">Veggie-Tage</span>
                  <span className="text-xl font-bold text-teal-900">{weekStats.vegDays} / 7</span>
                  <span className="text-[10px] text-teal-600 block">(Gesund)</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5">
                  <span className="text-xs text-amber-700 font-medium block">Ø Kalorien</span>
                  <span className="text-xl font-bold text-amber-900">{weekStats.avgCalories} kcal</span>
                  <span className="text-[10px] text-amber-600 block">(Pro Portion)</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end lg:self-center">
                <button
                  onClick={generateWeeklyPlan}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition hover:shadow-md active:scale-95"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Sonntags-Plan neu generieren</span>
                </button>
              </div>
            </div>

            {/* RESTRICTION HIGHLIGHT BADGES */}
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-200/80 rounded-xl p-3.5 text-xs text-slate-700 flex flex-wrap gap-x-6 gap-y-2 items-center">
              <span className="font-semibold text-slate-900 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                Aktive Regeln & Filtereinstellungen:
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Tomatensoße OK / Frische Tomaten verboten
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Überbackener Käse OK / Roher Käse gemieden
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                14 Tage Wiederholungssperre
              </span>
            </div>

            {/* 7-DAY MEAL CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentWeekPlan.map((dayPlan, index) => {
                const isFav = dayPlan.meal && favorites.includes(dayPlan.meal.id);

                return (
                  <div 
                    key={dayPlan.day}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Card Header */}
                    <div>
                      <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200/60 flex items-center justify-between">
                        <span className="font-bold text-slate-900">{dayPlan.day}</span>
                        <div className="flex items-center space-x-1">
                          {dayPlan.meal?.isMeat && (
                            <span className="bg-rose-100 text-rose-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Fleisch
                            </span>
                          )}
                          {dayPlan.meal?.isFish && (
                            <span className="bg-sky-100 text-sky-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Fisch
                            </span>
                          )}
                          {!dayPlan.meal?.isMeat && !dayPlan.meal?.isFish && (
                            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Veggie
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Meal Body */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition">
                            {dayPlan.meal?.name}
                          </h3>
                          <button
                            onClick={() => toggleFavorite(dayPlan.meal.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition shrink-0"
                            title="Zu Favoriten hinzufügen"
                          >
                            <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {dayPlan.meal?.prepTime} Min.
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-amber-500" />
                            {dayPlan.meal?.calories} kcal
                          </span>
                          <span className="text-amber-500 font-medium">
                            ★ {dayPlan.meal?.kidsRating}/5 (Kinder)
                          </span>
                        </div>

                        {/* Special Custom Options / Alerts */}
                        <div className="space-y-2 pt-1">
                          {/* Mama Option */}
                          {dayPlan.meal?.mamaOption && (
                            <div className="bg-emerald-50 border border-emerald-200/70 p-2 rounded-xl flex items-start space-x-2 text-xs">
                              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-emerald-900 block">Mama-Spezial:</span>
                                <span className="text-emerald-800">{dayPlan.meal.mamaOption}</span>
                              </div>
                            </div>
                          )}

                          {/* Fish Alternative */}
                          {dayPlan.meal?.isFish && dayPlan.meal?.fishAlternative && (
                            <div className="bg-amber-50 border border-amber-200/70 p-2 rounded-xl flex items-start space-x-2 text-xs">
                              <UserCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-amber-900 block">Fisch-Alternative (1 Pers.):</span>
                                <span className="text-amber-800">{dayPlan.meal.fishAlternative}</span>
                              </div>
                            </div>
                          )}

                          {/* Fresh Tomato Rule Note */}
                          {dayPlan.meal?.freshTomatoWarning && (
                            <div className="bg-rose-50 border border-rose-200/70 p-2 rounded-xl flex items-start space-x-2 text-xs">
                              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-rose-900 block">Frische Tomaten vermeiden:</span>
                                <span className="text-rose-800">{dayPlan.meal.tomatoNote}</span>
                              </div>
                            </div>
                          )}

                          {/* Cheese Note */}
                          {dayPlan.meal?.cheeseNote && (
                            <div className="bg-sky-50 border border-sky-200/70 p-2 rounded-xl flex items-start space-x-2 text-xs">
                              <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-sky-900 block">Käse-Präferenz:</span>
                                <span className="text-sky-800">{dayPlan.meal.cheeseNote}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Re-roll button */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
                      <button
                        onClick={() => rerollDay(index)}
                        className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1.5 transition active:scale-98 shadow-2xs"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-teal-600" />
                        <span>Gericht neu würfeln</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: EINKAUFSLISTE */}
        {activeTab === 'shopping' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-teal-600" />
                  <span>Einkaufsliste für die kommende Woche</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Automatisch berechnet basierend auf allen 7 Mahlzeiten inkl. Fisch-Ausweichzutaten.
                </p>
              </div>

              <div className="text-xs bg-slate-100 px-3 py-2 rounded-xl text-slate-600 border border-slate-200">
                <span>Häkchen setzen zum Erledigen</span>
              </div>
            </div>

            {/* Shopping Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(shoppingList).map(([category, items]) => (
                <div key={category} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                      {category}
                    </h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {items.length} Artikel
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Keine Artikel in dieser Kategorie.</p>
                  ) : (
                    <ul className="space-y-2">
                      {items.map((item) => {
                        const isChecked = !!checkedIngredients[item.id];

                        return (
                          <li 
                            key={item.id}
                            onClick={() => toggleCheckIngredient(item.id)}
                            className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition select-none ${
                              isChecked 
                                ? 'bg-slate-50 text-slate-400 line-through' 
                                : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {isChecked ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                              )}
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-md font-semibold ${
                              isChecked ? 'bg-slate-100 text-slate-400' : 'bg-teal-50 text-teal-700'
                            }`}>
                              {item.amount} {item.unit}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REZEPTE & FAVORITEN POOL */}
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-teal-600" />
                  <span>Rezept-Datenbank ({recipes.length} Gerichte)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enthält alle 27 Gerichte aus deiner docx-Vorlage & gesunde Ergänzungen.
                </p>
              </div>
            </div>

            {/* RECIPE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recipes.map(recipe => {
                const isFav = favorites.includes(recipe.id);

                return (
                  <div key={recipe.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 block">
                            {recipe.category}
                          </span>
                          <h3 className="font-bold text-slate-900 text-base">{recipe.name}</h3>
                        </div>
                        <button
                          onClick={() => toggleFavorite(recipe.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 transition"
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Info Badges */}
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {recipe.isMeat && <span className="bg-rose-100 text-rose-800 text-[10px] px-2 py-0.5 rounded-md font-semibold">Fleisch</span>}
                        {recipe.isFish && <span className="bg-sky-100 text-sky-800 text-[10px] px-2 py-0.5 rounded-md font-semibold">Fisch</span>}
                        {!recipe.isMeat && !recipe.isFish && <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-md font-semibold">Veggie</span>}
                        {recipe.fromOriginalList && <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-md font-semibold">Aus Vorlage</span>}
                      </div>

                      {/* Rule Badges */}
                      <div className="mt-3 space-y-1 text-xs">
                        {recipe.freshTomatoWarning && (
                          <p className="text-rose-700 bg-rose-50 p-1.5 rounded-lg border border-rose-100">
                            🍅 <strong>Frische Tomaten:</strong> Vermeiden für 1 Pers.
                          </p>
                        )}
                        {recipe.cheeseNote && (
                          <p className="text-sky-700 bg-sky-50 p-1.5 rounded-lg border border-sky-100">
                            🧀 <strong>Käse-Präferenz:</strong> {recipe.cheeseNote}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
                      <span>{recipe.prepTime} Min. Zubereitung</span>
                      <span>{recipe.calories} kcal</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}