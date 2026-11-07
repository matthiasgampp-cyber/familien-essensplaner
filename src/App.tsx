import { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  ShoppingBag, 
  RotateCw, 
  Heart, 
  CheckCircle2, 
  Circle, 
  Flame, 
  Clock, 
  Check, 
  Utensils, 
  ChefHat,
  Filter,
  X,
  Edit3,
  Plus,
  Trash2,
  Save
} from 'lucide-react';

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  category: 'Kühlregal' | 'Gemüse' | 'Vorrat' | 'Fleisch & Fisch';
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  isMeat: boolean;
  isFish: boolean;
  meatType?: 'Hähnchen' | 'Rind' | 'Schwein' | 'Andere';
  calories: number;
  prepTime: number;
  kidsRating: number;
  mamaOption: string | null;
  fishAlternative: string | null;
  freshTomatoWarning: boolean;
  tomatoNote: string | null;
  cheeseNote: string | null;
  ingredients: Ingredient[];
  fromOriginalList: boolean;
}

export interface DayPlan {
  day: string;
  meal: Recipe;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: string;
}

const INITIAL_RECIPES: Recipe[] = [
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
    meatType: 'Rind',
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
    meatType: 'Hähnchen',
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
    meatType: 'Rind',
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
      { name: 'Hackfleisch Rind/Schwein', amount: 350, unit: 'g', category: 'Fleisch & Fisch' },
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
    category: 'Schwäbisch / Schwein',
    isMeat: true,
    isFish: false,
    meatType: 'Schwein',
    calories: 510,
    prepTime: 20,
    kidsRating: 5,
    mamaOption: 'Mit gebratener Paprika',
    fishAlternative: null,
    freshTomatoWarning: true,
    tomatoNote: 'Salat ohne frische Tomaten zubereiten (z.B. Gurken-Kräuter-Salat).',
    cheeseNote: null,
    ingredients: [
      { name: 'Maultaschen (Schwein/Gemüse)', amount: 2, unit: 'Pck.', category: 'Kühlregal' },
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
    meatType: 'Rind',
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
    meatType: 'Hähnchen',
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
    fishAlternative: 'Gegrillte Hähnchenbruststreifen',
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Lachs / Schollenfilet (für 3 Pers.)', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Hähnchenbrust (für 1 Pers. Ausweich)', amount: 150, unit: 'g', category: 'Fleisch & Fisch' },
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
    meatType: 'Hähnchen',
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
    meatType: 'Rind',
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
    meatType: 'Rind',
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
    meatType: 'Hähnchen',
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
    fishAlternative: 'Überbackener Halloumi oder Hähnchen-Schnitzel',
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
    meatType: 'Hähnchen',
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
    meatType: 'Rind',
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
    meatType: 'Hähnchen',
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
    meatType: 'Hähnchen',
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
    meatType: 'Hähnchen',
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
    name: 'Schweine-Schnitzel mit Pommes & Erbsen',
    category: 'Klassiker / Schwein',
    isMeat: true,
    isFish: false,
    meatType: 'Schwein',
    calories: 540,
    prepTime: 30,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Schweineschnitzel (mager)', amount: 4, unit: 'Stk.', category: 'Fleisch & Fisch' },
      { name: 'Paniermehl & Ei', amount: 1, unit: 'Set', category: 'Vorrat' },
      { name: 'Backofen-Pommes', amount: 600, unit: 'g', category: 'Kühlregal' },
      { name: 'Erbsen (TK)', amount: 300, unit: 'g', category: 'Gemüse' }
    ],
    fromOriginalList: false
  }
];

const DAYS_OF_WEEK = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('plan');
  
  // Persistent recipes in localStorage
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('familien_recipes_v2');
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  const [favorites, setFavorites] = useState<string[]>(['3', '7', '14', '15', '26']);
  const [historyIds] = useState<string[]>(['2', '4', '8', '11', '13', '18', '20']);
  
  // Excluded ingredients state
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [newIngredientInput, setNewIngredientInput] = useState<string>('');

  const [currentWeekPlan, setCurrentWeekPlan] = useState<DayPlan[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  // Editing state for recipe modal
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    localStorage.setItem('familien_recipes_v2', JSON.stringify(recipes));
  }, [recipes]);

  const addExcludedIngredient = () => {
    const trimmed = newIngredientInput.trim().toLowerCase();
    if (trimmed && !excludedIngredients.includes(trimmed)) {
      setExcludedIngredients(prev => [...prev, trimmed]);
      setNewIngredientInput('');
    }
  };

  const removeExcludedIngredient = (item: string) => {
    setExcludedIngredients(prev => prev.filter(i => i !== item));
  };

  const isRecipeAllowed = (recipe: Recipe): boolean => {
    if (recipe.isMeat && recipe.meatType && !['Hähnchen', 'Rind', 'Schwein'].includes(recipe.meatType)) {
      return false;
    }

    if (excludedIngredients.length === 0) return true;

    return !recipe.ingredients.some(ing => 
      excludedIngredients.some(ex => ing.name.toLowerCase().includes(ex))
    );
  };

  const getEligibleRecipes = (excludeIds: string[] = [], meatCountCurrent: number = 0, maxMeat: number = 4): Recipe[] => {
    const allBlockedIds = new Set([...historyIds, ...excludeIds]);
    
    let eligible = recipes.filter(r => !allBlockedIds.has(r.id) && isRecipeAllowed(r));
    
    if (eligible.length < 3) {
      eligible = recipes.filter(r => !excludeIds.includes(r.id) && isRecipeAllowed(r));
    }

    if (meatCountCurrent >= maxMeat) {
      eligible = eligible.filter(r => !r.isMeat);
    }
    
    return eligible;
  };

  const generateWeeklyPlan = () => {
    let plan: DayPlan[] = [];
    let selectedIds: string[] = [];
    let meatCount = 0;
    const targetMeatDays = Math.random() > 0.5 ? 3 : 4;

    for (let i = 0; i < 7; i++) {
      let candidatePool = getEligibleRecipes(selectedIds, meatCount, targetMeatDays);
      
      const remainingDays = 7 - i;
      const neededMeat = targetMeatDays - meatCount;
      if (neededMeat > 0 && remainingDays <= neededMeat) {
        const meatPool = candidatePool.filter(r => r.isMeat);
        if (meatPool.length > 0) candidatePool = meatPool;
      }

      let weightedPool: Recipe[] = [];
      candidatePool.forEach(r => {
        weightedPool.push(r);
        if (favorites.includes(r.id)) {
          weightedPool.push(r);
        }
      });

      const fallback = recipes.find(r => isRecipeAllowed(r)) || recipes[0];
      const selected = weightedPool[Math.floor(Math.random() * weightedPool.length)] || fallback;
      
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

  const rerollDay = (dayIndex: number) => {
    const currentMeatCount = currentWeekPlan.reduce((acc, curr, idx) => {
      if (idx === dayIndex) return acc;
      return acc + (curr.meal.isMeat ? 1 : 0);
    }, 0);

    const otherSelectedIds = currentWeekPlan
      .filter((_, idx) => idx !== dayIndex)
      .map(p => p.meal.id);

    const candidatePool = getEligibleRecipes(otherSelectedIds, currentMeatCount, 4);

    let weightedPool: Recipe[] = [];
    candidatePool.forEach(r => {
      weightedPool.push(r);
      if (favorites.includes(r.id)) weightedPool.push(r);
    });

    const fallback = recipes.find(r => isRecipeAllowed(r)) || recipes[0];
    const newMeal = weightedPool[Math.floor(Math.random() * weightedPool.length)] || fallback;

    const updatedPlan = [...currentWeekPlan];
    updatedPlan[dayIndex] = {
      ...updatedPlan[dayIndex],
      meal: newMeal
    };

    setCurrentWeekPlan(updatedPlan);
  };

  useEffect(() => {
    generateWeeklyPlan();
  }, [excludedIngredients]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const weekStats = useMemo(() => {
    const meatDays = currentWeekPlan.filter(p => p.meal?.isMeat).length;
    const fishDays = currentWeekPlan.filter(p => p.meal?.isFish).length;
    const vegDays = 7 - meatDays - fishDays;
    const avgCalories = currentWeekPlan.length > 0 ? Math.round(
      currentWeekPlan.reduce((acc, p) => acc + (p.meal?.calories || 0), 0) / 7
    ) : 0;

    return { meatDays, fishDays, vegDays, avgCalories };
  }, [currentWeekPlan]);

  const shoppingList = useMemo(() => {
    const categories: Record<string, ShoppingItem[]> = {
      'Gemüse': [],
      'Fleisch & Fisch': [],
      'Kühlregal': [],
      'Vorrat': []
    };

    currentWeekPlan.forEach(dayPlan => {
      if (!dayPlan.meal) return;
      dayPlan.meal.ingredients.forEach(ing => {
        const catKey = categories[ing.category] ? ing.category : 'Vorrat';
        const existingIndex = categories[catKey].findIndex(item => item.name.toLowerCase() === ing.name.toLowerCase());

        if (existingIndex > -1) {
          categories[catKey][existingIndex].amount += ing.amount;
        } else {
          categories[catKey].push({
            id: `${ing.name}-${ing.category}`,
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
            category: catKey
          });
        }
      });
    });

    return categories;
  }, [currentWeekPlan]);

  const toggleCheckIngredient = (id: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Recipe edit handlers
  const saveRecipeChanges = (updatedRecipe: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
    setCurrentWeekPlan(prev => prev.map(dp => dp.meal.id === updatedRecipe.id ? { ...dp, meal: updatedRecipe } : dp));
    setEditingRecipe(null);
  };

  const updateEditingIngredient = (index: number, field: keyof Ingredient, value: any) => {
    if (!editingRecipe) return;
    const newIngredients = [...editingRecipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setEditingRecipe({ ...editingRecipe, ingredients: newIngredients });
  };

  const addIngredientToEditing = () => {
    if (!editingRecipe) return;
    setEditingRecipe({
      ...editingRecipe,
      ingredients: [
        ...editingRecipe.ingredients,
        { name: 'Neue Zutat', amount: 100, unit: 'g', category: 'Vorrat' }
      ]
    });
  };

  const removeIngredientFromEditing = (index: number) => {
    if (!editingRecipe) return;
    setEditingRecipe({
      ...editingRecipe,
      ingredients: editingRecipe.ingredients.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
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

      <main className="max-w-6xl mx-auto px-4 pt-6">
        {activeTab === 'plan' && (
          <div className="space-y-6">
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

            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
              <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-200/80 rounded-xl p-3.5 text-xs text-slate-700 flex flex-wrap gap-x-6 gap-y-2 items-center">
                <span className="font-semibold text-slate-900 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-amber-600" />
                  Aktive Regeln:
                </span>
                <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Fleisch nur Hähnchen, Rind & Schwein
                </span>
                <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Tomatensoße OK / Frische Tomaten verboten
                </span>
                <span className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Überbackener Käse OK / Roher Käse gemieden
                </span>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  🚫 Zutaten grundsätzlich ausschließen (z.B. Pilze, Erbsen, Knoblauch):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newIngredientInput}
                    onChange={(e) => setNewIngredientInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addExcludedIngredient()}
                    placeholder="Zutat eingeben..."
                    className="flex-1 px-3 py-1.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={addExcludedIngredient}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition"
                  >
                    Ausschließen
                  </button>
                </div>

                {excludedIngredients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {excludedIngredients.map((item) => (
                      <span 
                        key={item}
                        className="bg-rose-50 text-rose-700 border border-rose-200 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium"
                      >
                        {item}
                        <button onClick={() => removeExcludedIngredient(item)} className="hover:text-rose-900">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {currentWeekPlan.map((dayPlan, index) => {
                const isFav = dayPlan.meal && favorites.includes(dayPlan.meal.id);

                return (
                  <div 
                    key={dayPlan.day}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200/60 flex items-center justify-between">
                        <span className="font-bold text-slate-900">{dayPlan.day}</span>
                        <div className="flex items-center space-x-1">
                          {dayPlan.meal?.isMeat && (
                            <span className="bg-rose-100 text-rose-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Fleisch ({dayPlan.meal.meatType})
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

                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-teal-700 transition">
                            {dayPlan.meal?.name}
                          </h3>
                          <button
                            onClick={() => toggleFavorite(dayPlan.meal.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition shrink-0"
                          >
                            <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>
                        </div>

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
                            ★ {dayPlan.meal?.kidsRating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setEditingRecipe(dayPlan.meal)}
                        className="py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Bearbeiten</span>
                      </button>
                      <button
                        onClick={() => rerollDay(index)}
                        className="flex-1 py-2 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition active:scale-98"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Neu würfeln</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'shopping' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-teal-600" />
                  <span>Einkaufsliste für die kommende Woche</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Automatisch berechnet basierend auf deinen (ggf. angepassten) Gerichten.
                </p>
              </div>
            </div>

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

        {activeTab === 'recipes' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-teal-600" />
                  <span>Rezept-Datenbank ({recipes.length} Gerichte)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Klicke auf ein Rezept oder den Bearbeiten-Button, um Zutaten (z. B. Kartoffeln $\rightarrow$ Reis) zu ändern.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recipes.map(recipe => {
                const isFav = favorites.includes(recipe.id);

                return (
                  <div 
                    key={recipe.id} 
                    onClick={() => setEditingRecipe(recipe)}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-500 cursor-pointer transition group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 block">
                            {recipe.category}
                          </span>
                          <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition">
                            {recipe.name}
                          </h3>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(recipe.id);
                          }}
                          className="p-1 text-slate-400 hover:text-rose-500 transition"
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      {/* Ingredients preview */}
                      <div className="mt-3 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">Zutaten:</span>
                        <div className="flex flex-wrap gap-1 text-xs text-slate-600">
                          {recipe.ingredients.map((ing, idx) => (
                            <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded-md">
                              {ing.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-xs text-teal-600 font-semibold flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        <Edit3 className="w-3.5 h-3.5" /> Rezept & Zutaten anpassen
                      </span>
                      <span className="text-slate-400">{recipe.calories} kcal</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* RECEPT EDITING MODAL */}
      {editingRecipe && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-teal-600" />
                Rezept bearbeiten
              </h3>
              <button 
                onClick={() => setEditingRecipe(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Name des Gerichts:</label>
                <input
                  type="text"
                  value={editingRecipe.name}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategorie:</label>
                <input
                  type="text"
                  value={editingRecipe.category}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Zubereitungszeit (Min):</label>
                <input
                  type="number"
                  value={editingRecipe.prepTime}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kalorien (kcal):</label>
                <input
                  type="number"
                  value={editingRecipe.calories}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, calories: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            {/* Ingredients Editor List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm">Zutatenliste für die Einkaufsliste:</h4>
                <button
                  onClick={addIngredientToEditing}
                  className="text-xs bg-teal-50 text-teal-700 font-bold px-3 py-1.5 rounded-xl border border-teal-200 flex items-center gap-1 hover:bg-teal-100 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Zutat hinzufügen
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {editingRecipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
                    <input
                      type="text"
                      value={ing.name}
                      placeholder="z. B. Reis statt Kartoffeln"
                      onChange={(e) => updateEditingIngredient(idx, 'name', e.target.value)}
                      className="flex-1 px-2 py-1 border rounded-lg bg-white outline-none"
                    />
                    <input
                      type="number"
                      value={ing.amount}
                      onChange={(e) => updateEditingIngredient(idx, 'amount', Number(e.target.value))}
                      className="w-16 px-2 py-1 border rounded-lg bg-white outline-none"
                    />
                    <input
                      type="text"
                      value={ing.unit}
                      placeholder="g / Stk."
                      onChange={(e) => updateEditingIngredient(idx, 'unit', e.target.value)}
                      className="w-16 px-2 py-1 border rounded-lg bg-white outline-none"
                    />
                    <select
                      value={ing.category}
                      onChange={(e) => updateEditingIngredient(idx, 'category', e.target.value as any)}
                      className="px-2 py-1 border rounded-lg bg-white outline-none"
                    >
                      <option value="Gemüse">Gemüse</option>
                      <option value="Fleisch & Fisch">Fleisch & Fisch</option>
                      <option value="Kühlregal">Kühlregal</option>
                      <option value="Vorrat">Vorrat</option>
                    </select>
                    <button
                      onClick={() => removeIngredientFromEditing(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 border-t pt-4">
              <button
                onClick={() => setEditingRecipe(null)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Abbrechen
              </button>
              <button
                onClick={() => saveRecipeChanges(editingRecipe)}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition"
              >
                <Save className="w-4 h-4" /> Änderungen speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}