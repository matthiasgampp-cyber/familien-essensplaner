// src/recipes.ts

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
  instructions: string;
  isAirfryer?: boolean;
  fromOriginalList: boolean;
}

export const INITIAL_RECIPES: Recipe[] = [
  // --- URSPRÜNGLICHE REZEPTE (1-29) ---
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
    instructions: 'Spätzle nach Packungsanleitung kochen. Rosenkohl bissfest garen. Rahmsoße anrühren, Feta im Ofen schmelzen und alles zusammen servieren.',
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
    instructions: 'Brokkoli und Kartoffeln weich kochen, pürieren und mit Sahne verfeinern. Pfannenbrot frisch ausbacken.',
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
    instructions: 'Hackfleisch anbraten, Gemüse und passierte Tomaten dazugeben, einkochen lassen. Spaghetti kochen.',
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
    instructions: 'Hähnchen anbraten, Tomaten und Kokosmilch dazugeben, köcheln lassen. Mit Reis servieren.',
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
    instructions: 'Kartoffeln stampfen, Fisch schonend braten, Spinat erwärmen.',
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
    instructions: 'Paprika füllen, in Soße im Ofen garen.',
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
    instructions: 'Teig belegen (ohne rohe Tomaten für 1 Person) und backen.',
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
    instructions: 'Maultaschen anbraten, Salat ohne frische Tomaten dazu reichen.',
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
    instructions: 'Kürbis und Möhren kochen, pürieren, mit Kokosmilch verfeinern.',
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
    instructions: 'Nudeln kochen, Hackfleisch-Soße anbraten und mischen.',
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
    instructions: 'Hähnchen und Gemüse anbraten, Currysoße zugeben, mit Reis servieren.',
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
    instructions: 'Kartoffeln und Gemüse kochen, Fisch und Hähnchen anbraten.',
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
    instructions: 'Hühnchen mit Suppengrün auskochen, Nudeln zugeben.',
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
    instructions: 'Patties braten, Pommes im Ofen machen, Burger zusammenbauen.',
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
    instructions: 'Tortellini kochen, Soße erhitzen, Blumenkohl überbacken.',
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
    instructions: 'Spinat und Kartoffeln kochen, pürieren, Pfannenbrot dazu backen.',
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
    instructions: 'Schichten und im Ofen überbacken.',
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
    instructions: 'Hähnchen und Paprika anbraten, Reis kochen.',
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
    instructions: 'Bratkartoffeln machen, Bohnen kochen, Fisch braten.',
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
    instructions: 'Hähnchen anbraten, Reis und Gemüse garen.',
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
    instructions: 'Süßkartoffeln im Ofen backen, füllen und überbacken.',
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
    instructions: 'Gemüsesuppe kochen, Dampfnudeln zubereiten.',
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
    instructions: 'Hackbällchen anbraten, in Soße köcheln, Nudeln kochen.',
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
    instructions: 'Hähnchen und Gemüse mit Kurkuma anbraten, mit Reis servieren.',
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
    instructions: 'Gratin im Ofen backen, Fisch und Brokkoli garen.',
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
    instructions: 'Hähnchen und Pommes im Ofen knusprig backen.',
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
    instructions: 'Fleisch und Gemüse anbraten, Wraps füllen und rollen.',
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
    instructions: 'Alles auf einem Blech vermengen und im Ofen backen.',
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
    instructions: 'Schnitzel panieren und braten, Pommes dazu machen.',
    fromOriginalList: false
  },

  // --- NEUE AIRFRYER-REZEPTE (60-79) ---
  {
    id: '60',
    name: 'Airfryer Hähnchenschenkel mit Ofengemüse',
    category: 'Airfryer / Geflügel',
    isMeat: true,
    isFish: false,
    meatType: 'Hähnchen',
    calories: 510,
    prepTime: 25,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenschenkel', amount: 4, unit: 'Stk.', category: 'Fleisch & Fisch' },
      { name: 'Paprika & Zucchini', amount: 400, unit: 'g', category: 'Gemüse' },
      { name: 'Olivenöl & Gewürze', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    instructions: 'Hähnchenschenkel mit Gewürzen einreiben und bei 190°C ca. 25 Minuten im Airfryer knusprig garen. Gemüse nach 10 Minuten dazugeben.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '61',
    name: 'Airfryer Lachsfilet mit Brokkoli',
    category: 'Airfryer / Fisch',
    isMeat: false,
    isFish: true,
    calories: 430,
    prepTime: 18,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: 'Hähnchenbrust',
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Lachsfilet (für 3 Pers.)', amount: 450, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Hähnchenbrust (für 1 Pers. Ausweich)', amount: 150, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Brokkoli-Röschen', amount: 400, unit: 'g', category: 'Gemüse' },
      { name: 'Sojasoße & Honig', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    instructions: 'Lachs mit Sojasoße und Honig marinieren. Im Airfryer bei 180°C in 12–15 Minuten saftig garen. Brokkoli kurz mitvorgaren.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '62',
    name: 'Airfryer Hähnchen-Nuggets selbstgemacht',
    category: 'Airfryer / Geflügel',
    isMeat: true,
    isFish: false,
    meatType: 'Hähnchen',
    calories: 450,
    prepTime: 20,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenbrustfilet', amount: 500, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Cornflakes (zerbröselt) & Ei', amount: 1, unit: 'Set', category: 'Vorrat' },
      { name: 'Kartoffeln für Pommes', amount: 600, unit: 'g', category: 'Gemüse' }
    ],
    instructions: 'Hähnchen in Stücke schneiden, in Ei und Cornflakes-Bröseln wenden. Im Airfryer bei 200°C in 12 Minuten super knusprig backen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '63',
    name: 'Airfryer Schweine-Spieße mit Paprika',
    category: 'Airfryer / Schwein',
    isMeat: true,
    isFish: false,
    meatType: 'Schwein',
    calories: 480,
    prepTime: 25,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Schweinegulasch / Fleisch für Spieße', amount: 500, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Paprika & Zwiebeln', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Reis als Beilage', amount: 300, unit: 'g', category: 'Vorrat' }
    ],
    instructions: 'Fleisch und Gemüse abwechselnd auf Spieße stecken. Im Airfryer bei 195°C für 18 Minuten grillen. Mit Reis servieren.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '64',
    name: 'Airfryer Ofenkartoffeln & Kräuterquark',
    category: 'Airfryer / Veggi',
    isMeat: false,
    isFish: false,
    calories: 380,
    prepTime: 30,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Grosse Festkochende Kartoffeln', amount: 800, unit: 'g', category: 'Gemüse' },
      { name: 'Magerquark & Kräuter', amount: 250, unit: 'g', category: 'Kühlregal' },
      { name: 'Olivenöl & Meersalz', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    instructions: 'Kartoffeln gründlich waschen, mehrfach mit der Gabel einstechen, mit Öl einreiben. Im Airfryer bei 200°C in ca. 35 Minuten weich backen. Mit Quark servieren.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '65',
    name: 'Airfryer Mini-Pizzen (aus Wraps)',
    category: 'Airfryer / Schnell',
    isMeat: false,
    isFish: false,
    calories: 490,
    prepTime: 15,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: true,
    tomatoNote: 'Verarbeitete Pizzasauce verwenden. Keine frischen Tomaten als Belag.',
    cheeseNote: 'Käse im Airfryer geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Tortilla-Wraps (klein)', amount: 4, unit: 'Stk.', category: 'Vorrat' },
      { name: 'Passierte Tomaten / Pizzasauce', amount: 150, unit: 'ml', category: 'Vorrat' },
      { name: 'Geriebener Käse', amount: 150, unit: 'g', category: 'Kühlregal' },
      { name: 'Schinken oder Paprika', amount: 100, unit: 'g', category: 'Kühlregal' }
    ],
    instructions: 'Wraps mit Sauce bestreichen, nach Wunsch belegen und mit Käse bestreuen. Im Airfryer bei 180°C in 5–7 Minuten knusprig backen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '66',
    name: 'Airfryer Hähnchenbrust in Cornflakes-Panade',
    category: 'Airfryer / Geflügel',
    isMeat: true,
    isFish: false,
    meatType: 'Hähnchen',
    calories: 500,
    prepTime: 25,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenbrustfilet', amount: 500, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Cornflakes zerbröselt', amount: 100, unit: 'g', category: 'Vorrat' },
      { name: 'Ei & Mehl', amount: 1, unit: 'Set', category: 'Vorrat' },
      { name: 'Erbsen als Beilage', amount: 300, unit: 'g', category: 'Gemüse' }
    ],
    instructions: 'Hähnchen in Mehl, Ei und Cornflakes wenden. Im Airfryer bei 190°C ca. 16 Minuten goldbraun backen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '67',
    name: 'Airfryer Frikadellen mit Süßkartoffel-Pommes',
    category: 'Airfryer / Rind',
    isMeat: true,
    isFish: false,
    meatType: 'Rind',
    calories: 560,
    prepTime: 30,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Rinderhackfleisch', amount: 500, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Süßkartoffeln', amount: 600, unit: 'g', category: 'Gemüse' },
      { name: 'Gewürze', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    instructions: 'Süßkartoffel-Pommes im Airfryer 15 Min vorbacken. Frikadellen formen und die letzten 12 Minuten mit in den Korb geben.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '68',
    name: 'Airfryer Blumenkohl-Röschen mit Käse',
    category: 'Airfryer / Veggi',
    isMeat: false,
    isFish: false,
    calories: 350,
    prepTime: 20,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: 'Käse geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Blumenkohl', amount: 1, unit: 'Kopf', category: 'Gemüse' },
      { name: 'Geriebener Käse', amount: 100, unit: 'g', category: 'Kühlregal' },
      { name: 'Olivenöl & Paprikapulver', amount: 1, unit: 'Set', category: 'Vorrat' }
    ],
    instructions: 'Blumenkohl in Röschen teilen, mit Öl und Gewürzen vermengen. Bei 180°C 18 Minuten rösten, kurz vor Ende mit Käse bestreuen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '69',
    name: 'Airfryer Schweine-Schnitzel ohne Fett',
    category: 'Airfryer / Schwein',
    isMeat: true,
    isFish: false,
    meatType: 'Schwein',
    calories: 520,
    prepTime: 25,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Schweineschnitzel', amount: 4, unit: 'Stk.', category: 'Fleisch & Fisch' },
      { name: 'Paniermehl & Ei', amount: 1, unit: 'Set', category: 'Vorrat' },
      { name: 'Kartoffeln für Salzkartoffeln', amount: 800, unit: 'g', category: 'Gemüse' }
    ],
    instructions: 'Schnitzel klassisch panieren, mit etwas Öl besprühen und im Airfryer bei 200°C in 15 Minuten wenden & knusprig backen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '70',
    name: 'Airfryer Halloumi-Spieße mit Gemüse',
    category: 'Airfryer / Veggi',
    isMeat: false,
    isFish: false,
    calories: 440,
    prepTime: 20,
    kidsRating: 4,
    mamaOption: 'Perfekter vegetarischer Genuss',
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: 'Halloumi im Airfryer kross gebacken (erlaubt).',
    ingredients: [
      { name: 'Halloumi Käse', amount: 2, unit: 'Pck.', category: 'Kühlregal' },
      { name: 'Paprika & Zucchini', amount: 2, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Fladenbrot', amount: 1, unit: 'Stk.', category: 'Vorrat' }
    ],
    instructions: 'Halloumi und Gemüse würfeln, auf Spieße stecken. Bei 185°C im Airfryer 12–14 Minuten grillen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '71',
    name: 'Airfryer Hähnchen-Fajita-Taschen',
    category: 'Airfryer / Mexikanisch',
    isMeat: true,
    isFish: false,
    meatType: 'Hähnchen',
    calories: 490,
    prepTime: 20,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: true,
    tomatoNote: 'Salsa verarbeitet, keine frischen Tomaten.',
    cheeseNote: 'Käse geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Tortilla Wraps', amount: 4, unit: 'Stk.', category: 'Vorrat' },
      { name: 'Hähnchenbruststreifen', amount: 350, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Paprika & Mais', amount: 250, unit: 'g', category: 'Gemüse' },
      { name: 'Käse gerieben', amount: 100, unit: 'g', category: 'Kühlregal' }
    ],
    instructions: 'Wraps mit angebratenem Fleisch, Gemüse und Käse füllen, zuklappen und im Airfryer bei 190°C 6 Minuten goldbraun toasten.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '72',
    name: 'Airfryer Fischstäbchen & Ofenkartoffeln',
    category: 'Airfryer / Fisch',
    isMeat: false,
    isFish: true,
    calories: 440,
    prepTime: 15,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: 'Geflügel-Nuggets',
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Fischstäbchen (für 3 Pers.)', amount: 15, unit: 'Stk.', category: 'Kühlregal' },
      { name: 'Geflügelnuggets (für 1 Pers. Ausweich)', amount: 5, unit: 'Stk.', category: 'Fleisch & Fisch' },
      { name: 'Kartoffeln für Pommes', amount: 700, unit: 'g', category: 'Gemüse' }
    ],
    instructions: 'Kartoffeln als Pommes schneiden und 10 Min vorbacken. Fischstäbchen dazugeben und weitere 10 Minuten bei 200°C knusprig backen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '73',
    name: 'Airfryer Knoblauch-Hähnchenflügel',
    category: 'Airfryer / Geflügel',
    isMeat: true,
    isFish: false,
    meatType: 'Hähnchen',
    calories: 530,
    prepTime: 25,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Hähnchenflügel (Wings)', amount: 800, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Knoblauch & Gewürze', amount: 1, unit: 'Set', category: 'Vorrat' },
      { name: 'Gurkensalat', amount: 1, unit: 'Stk.', category: 'Gemüse' }
    ],
    instructions: 'Wings würzen und im Airfryer bei 200°C ca. 25 Minuten braten (zwischendurch wenden). Dazu frischen Gurkensalat reichen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '74',
    name: 'Airfryer Zucchini-Chips mit Kräuterquark',
    category: 'Airfryer / Snack & Meal',
    isMeat: false,
    isFish: false,
    calories: 320,
    prepTime: 20,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Zucchini', amount: 3, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Paniermehl & Parmesan', amount: 50, unit: 'g', category: 'Vorrat' },
      { name: 'Quark', amount: 200, unit: 'g', category: 'Kühlregal' }
    ],
    instructions: 'Zucchini in dünne Scheiben schneiden, in Ei und Paniermehl/Parmesan wenden. Bei 200°C 12 Minuten knusprig frittieren.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '75',
    name: 'Airfryer Rinder-Steak mit Ofenpaprika',
    category: 'Airfryer / Rind',
    isMeat: true,
    isFish: false,
    meatType: 'Rind',
    calories: 490,
    prepTime: 20,
    kidsRating: 4,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Rindersteak (Rumpsteak / Entrecote)', amount: 4, unit: 'Stk.', category: 'Fleisch & Fisch' },
      { name: 'Paprika', amount: 3, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Baguette', amount: 1, unit: 'Stk.', category: 'Kühlregal' }
    ],
    instructions: 'Steaks stark anwürzen und im Airfryer bei 200°C ca. 8–10 Minuten medium garen. Paprika direkt mitrösten.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '76',
    name: 'Airfryer Süßkartoffel-Gnocchi mit Gemüse',
    category: 'Airfryer / Veggi',
    isMeat: false,
    isFish: false,
    calories: 420,
    prepTime: 15,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Gnocchi (unkgekocht direkt in Airfryer)', amount: 500, unit: 'g', category: 'Kühlregal' },
      { name: 'Zucchini & Champignons', amount: 300, unit: 'g', category: 'Gemüse' },
      { name: 'Frischkäse zum Verfeinern', amount: 100, unit: 'g', category: 'Kühlregal' }
    ],
    instructions: 'Ungekochte Gnocchi mit Gemüse und etwas Öl vermengen. Bei 200°C 15 Minuten im Airfryer rösten, danach mit Frischkäse mischen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '77',
    name: 'Airfryer Schinken-Käse-Toast (French Toast Roll-Ups)',
    category: 'Airfryer / Schnell',
    isMeat: true,
    isFish: false,
    meatType: 'Schwein',
    calories: 460,
    prepTime: 15,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: 'Käse geschmolzen (erlaubt).',
    ingredients: [
      { name: 'Toastbrotscheiben', amount: 8, unit: 'Stk.', category: 'Vorrat' },
      { name: 'Kochschinken & Käsescheiben', amount: 1, unit: 'Set', category: 'Kühlregal' },
      { name: 'Ei & Milch zum Wenden', amount: 1, unit: 'Set', category: 'Kühlregal' }
    ],
    instructions: 'Toastränder abschneiden, flach rollen, mit Schinken & Käse belegen, aufrollen. In Ei wenden und im Airfryer bei 190°C 8 Minuten backen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '78',
    name: 'Airfryer Geflügelfrikadellen mit Erbsen',
    category: 'Airfryer / Geflügel',
    isMeat: true,
    isFish: false,
    meatType: 'Hähnchen',
    calories: 450,
    prepTime: 20,
    kidsRating: 5,
    mamaOption: null,
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Geflügelhackfleisch', amount: 500, unit: 'g', category: 'Fleisch & Fisch' },
      { name: 'Erbsen (TK)', amount: 350, unit: 'g', category: 'Gemüse' },
      { name: 'Kartoffelpüree', amount: 500, unit: 'g', category: 'Kühlregal' }
    ],
    instructions: 'Aus Hack Frikadellen formen. Im Airfryer bei 190°C 12 Minuten braten. Dazu Püree und warme Erbsen reichen.',
    isAirfryer: true,
    fromOriginalList: false
  },
  {
    id: '79',
    name: 'Airfryer Bratäpfle als Nachtisch / Hauptgericht',
    category: 'Airfryer / Süß',
    isMeat: false,
    isFish: false,
    calories: 340,
    prepTime: 15,
    kidsRating: 5,
    mamaOption: 'Mit Vanillesoße',
    fishAlternative: null,
    freshTomatoWarning: false,
    tomatoNote: null,
    cheeseNote: null,
    ingredients: [
      { name: 'Äpfel (groß)', amount: 4, unit: 'Stk.', category: 'Gemüse' },
      { name: 'Rosinen, Nüsse & Marzipan', amount: 1, unit: 'Set', category: 'Vorrat' },
      { name: 'Butter', amount: 40, unit: 'g', category: 'Kühlregal' }
    ],
    instructions: 'Äpfel entkernen, mit Nüssen, Marzipan und etwas Butter füllen. Im Airfryer bei 180°C in 15–18 Minuten weich backen.',
    isAirfryer: true,
    fromOriginalList: false
  }
];
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