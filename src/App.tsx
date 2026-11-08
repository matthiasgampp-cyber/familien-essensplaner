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
  Save,
  BookOpen,
  Zap,
  Coffee
} from 'lucide-react';
import { INITIAL_RECIPES, Recipe, Ingredient, DayPlan, ShoppingItem } from './recipes';

const DAYS_OF_WEEK = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('plan');
  
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('familien_recipes_v4');
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  const [favorites, setFavorites] = useState<string[]>(['3', '7', '14', '15', '26', '60']);
  const [historyIds] = useState<string[]>(['2', '4', '8', '11', '13', '18', '20']);
  
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [newIngredientInput, setNewIngredientInput] = useState<string>('');

  const [currentWeekPlan, setCurrentWeekPlan] = useState<DayPlan[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [assigningRecipe, setAssigningRecipe] = useState<Recipe | null>(null); // Für Modal: Rezept einem Tag zuweisen

  useEffect(() => {
    localStorage.setItem('familien_recipes_v4', JSON.stringify(recipes));
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
        if (favorites.includes(r.id)) weightedPool.push(r);
      });

      const fallback = recipes.find(r => isRecipeAllowed(r)) || recipes[0];
      const selected = weightedPool[Math.floor(Math.random() * weightedPool.length)] || fallback;
      
      if (selected.isMeat) meatCount++;

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
      return acc + (curr.meal?.isMeat ? 1 : 0);
    }, 0);

    const otherSelectedIds = currentWeekPlan.filter((_, idx) => idx !== dayIndex).map(p => p.meal?.id).filter(Boolean) as string[];
    const candidatePool = getEligibleRecipes(otherSelectedIds, currentMeatCount, 4);

    let weightedPool: Recipe[] = [];
    candidatePool.forEach(r => {
      weightedPool.push(r);
      if (favorites.includes(r.id)) weightedPool.push(r);
    });

    const fallback = recipes.find(r => isRecipeAllowed(r)) || recipes[0];
    const newMeal = weightedPool[Math.floor(Math.random() * weightedPool.length)] || fallback;

    const updatedPlan = [...currentWeekPlan];
    updatedPlan[dayIndex] = { ...updatedPlan[dayIndex], meal: newMeal };
    setCurrentWeekPlan(updatedPlan);
  };

  // Tag komplett freigeben / abwählen (Kein Kochen)
  const clearDayMeal = (dayIndex: number) => {
    const updatedPlan = [...currentWeekPlan];
    updatedPlan[dayIndex] = {
      ...updatedPlan[dayIndex],
      meal: null as any
    };
    setCurrentWeekPlan(updatedPlan);
  };

  // Bestimmtes Rezept direkt für einen Tag setzen
  const assignRecipeToDay = (dayName: string) => {
    if (!assigningRecipe) return;
    const index = currentWeekPlan.findIndex(p => p.day === dayName);
    if (index > -1) {
      const updatedPlan = [...currentWeekPlan];
      updatedPlan[index] = {
        ...updatedPlan[index],
        meal: assigningRecipe
      };
      setCurrentWeekPlan(updatedPlan);
    }
    setAssigningRecipe(null);
  };

  useEffect(() => {
    generateWeeklyPlan();
  }, [excludedIngredients]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]);
  };

  const weekStats = useMemo(() => {
    const meatDays = currentWeekPlan.filter(p => p.meal?.isMeat).length;
    const fishDays = currentWeekPlan.filter(p => p.meal?.isFish).length;
    const activeDaysCount = currentWeekPlan.filter(p => p.meal !== null).length;
    const vegDays = activeDaysCount - meatDays - fishDays;
    const avgCalories = activeDaysCount > 0 ? Math.round(
      currentWeekPlan.reduce((acc, p) => acc + (p.meal?.calories || 0), 0) / activeDaysCount
    ) : 0;
    return { meatDays, fishDays, vegDays: Math.max(0, vegDays), avgCalories };
  }, [currentWeekPlan]);

  const shoppingList = useMemo(() => {
    const categories: Record<string, ShoppingItem[]> = {
      'Gemüse': [],
      'Fleisch & Fisch': [],
      'Kühlregal': [],
      'Vorrat': []
    };

    currentWeekPlan.forEach(dayPlan => {
      if (!dayPlan.meal || !dayPlan.meal.ingredients) return;
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
    setCheckedIngredients(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const saveRecipeChanges = (updatedRecipe: Recipe) => {
    const exists = recipes.some(r => r.id === updatedRecipe.id);
    if (exists) {
      setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
      setCurrentWeekPlan(prev => prev.map(dp => dp.meal?.id === updatedRecipe.id ? { ...dp, meal: updatedRecipe } : dp));
    } else {
      setRecipes(prev => [updatedRecipe, ...prev]);
    }
    setEditingRecipe(null);
  };

  const deleteRecipe = (id: string) => {
    if (confirm('Möchtest du dieses Rezept wirklich löschen?')) {
      setRecipes(prev => prev.filter(r => r.id !== id));
      setEditingRecipe(null);
    }
  };

  const createNewRecipe = () => {
    const newId = String(Date.now());
    setEditingRecipe({
      id: newId,
      name: 'Neues Wunschrezept',
      category: 'Eigene Rezepte',
      isMeat: false,
      isFish: false,
      calories: 450,
      prepTime: 25,
      kidsRating: 5,
      mamaOption: null,
      fishAlternative: null,
      freshTomatoWarning: false,
      tomatoNote: null,
      cheeseNote: null,
      ingredients: [{ name: 'Zutat 1', amount: 200, unit: 'g', category: 'Vorrat' }],
      instructions: 'Zubereitung hier eintragen...',
      isAirfryer: false,
      fromOriginalList: false
    });
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
      ingredients: [...editingRecipe.ingredients, { name: 'Neue Zutat', amount: 100, unit: 'g', category: 'Vorrat' }]
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
                <span className="text-emerald-200">Mit Airfryer & Rezeptverwaltung</span>
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
              <span>Rezepte ({recipes.length})</span>
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
                  <span className="text-xl font-bold text-emerald-900">{weekStats.meatDays}</span>
                  <span className="text-[10px] text-emerald-600 block">(Ziel: 3-4x)</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5">
                  <span className="text-xs text-blue-700 font-medium block">Fischtage</span>
                  <span className="text-xl font-bold text-blue-900">{weekStats.fishDays}</span>
                  <span className="text-[10px] text-blue-600 block">(mit Alternative)</span>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl p-2.5">
                  <span className="text-xs text-teal-700 font-medium block">Veggie-Tage</span>
                  <span className="text-xl font-bold text-teal-900">{weekStats.vegDays}</span>
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
                  Tage können flexibel freigestellt werden
                </span>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  🚫 Zutaten grundsätzlich ausschließen:
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
                const hasMeal = dayPlan.meal !== null;

                return (
                  <div 
                    key={dayPlan.day}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      <div className="bg-slate-100/80 px-4 py-3 border-b border-slate-200/60 flex items-center justify-between">
                        <span className="font-bold text-slate-900">{dayPlan.day}</span>
                        <div className="flex items-center space-x-1">
                          {hasMeal && dayPlan.meal?.isAirfryer && (
                            <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Zap className="w-3 h-3 text-amber-600" /> Airfryer
                            </span>
                          )}
                          {hasMeal && dayPlan.meal?.isMeat && (
                            <span className="bg-rose-100 text-rose-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              {dayPlan.meal.meatType}
                            </span>
                          )}
                          {!hasMeal && (
                            <span className="bg-slate-200 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Coffee className="w-3 h-3" /> Frei
                            </span>
                          )}
                        </div>
                      </div>

                      {hasMeal ? (
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
                          </div>

                          {dayPlan.meal?.instructions && (
                            <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              <span className="font-bold block text-slate-700 mb-0.5 flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-teal-600" /> Anleitung:
                              </span>
                              {dayPlan.meal.instructions}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-6 text-center space-y-2">
                          <Coffee className="w-8 h-8 text-slate-300 mx-auto" />
                          <p className="text-xs font-semibold text-slate-500">An diesem Tag wird nicht gekocht / frei.</p>
                          <p className="text-[11px] text-slate-400">Fließt nicht in die Einkaufsliste ein.</p>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      {hasMeal ? (
                        <>
                          <button
                            onClick={() => setEditingRecipe(dayPlan.meal)}
                            className="py-2 px-2.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1 transition"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                            <span>Bearbeiten</span>
                          </button>
                          <button
                            onClick={() => clearDayMeal(index)}
                            className="py-2 px-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 transition"
                            title="Tag freigeben (nicht kochen)"
                          >
                            Frei
                          </button>
                          <button
                            onClick={() => rerollDay(index)}
                            className="flex-1 py-2 px-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 transition"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Neu</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => rerollDay(index)}
                          className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Rezept zuweisen</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'shopping' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-teal-600" />
                <span>Einkaufsliste für die kommende Woche</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">Berücksichtigt nur aktive Kochtage (freigestellte Tage sind ausgenommen).</p>
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
                              isChecked ? 'bg-slate-50 text-slate-400 line-through' : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              {isChecked ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <Circle className="w-5 h-5 text-slate-300 shrink-0" />}
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-md font-semibold ${isChecked ? 'bg-slate-100 text-slate-400' : 'bg-teal-50 text-teal-700'}`}>
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
                <p className="text-xs text-slate-500 mt-1">Plane Lieblingsrezepte direkt für einen bestimmten Wochentag ein.</p>
              </div>

              <button
                onClick={createNewRecipe}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 shadow-sm transition active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Rezept hinzufügen</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recipes.map(recipe => {
                const isFav = favorites.includes(recipe.id);
                return (
                  <div 
                    key={recipe.id} 
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-3 flex flex-col justify-between hover:border-teal-500 transition group"
                  >
                    <div onClick={() => setEditingRecipe(recipe)} className="cursor-pointer">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">{recipe.category}</span>
                            {recipe.isAirfryer && (
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                <Zap className="w-2.5 h-2.5 text-amber-600" /> Airfryer
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition">{recipe.name}</h3>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id); }}
                          className="p-1 text-slate-400 hover:text-rose-500 transition"
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                      </div>

                      <div className="mt-2 text-xs text-slate-600 line-clamp-2">{recipe.instructions}</div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setAssigningRecipe(recipe)}
                        className="flex-1 py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Für Wochentag wählen</span>
                      </button>
                      <button
                        onClick={() => setEditingRecipe(recipe)}
                        className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: REZEPT EINPLANEN */}
      {assigningRecipe && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" /> Wochentag wählen
              </h3>
              <button onClick={() => setAssigningRecipe(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Für welchen Tag möchtest du <strong className="text-slate-900">{assigningRecipe.name}</strong> einplanen?
            </p>

            <div className="space-y-2">
              {DAYS_OF_WEEK.map(day => (
                <button
                  key={day}
                  onClick={() => assignRecipeToDay(day)}
                  className="w-full py-2.5 px-4 bg-slate-50 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-between transition"
                >
                  <span>{day}</span>
                  <span className="text-[10px] text-slate-400 font-normal">Zuweisen</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REZEPT BEARBEITEN */}
      {editingRecipe && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-teal-600" /> Rezept bearbeiten
              </h3>
              <button onClick={() => setEditingRecipe(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Name:</label>
                <input
                  type="text"
                  value={editingRecipe.name}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kategorie:</label>
                <input
                  type="text"
                  value={editingRecipe.category}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Zubereitungszeit (Min):</label>
                <input
                  type="number"
                  value={editingRecipe.prepTime}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kalorien (kcal):</label>
                <input
                  type="number"
                  value={editingRecipe.calories}
                  onChange={(e) => setEditingRecipe({ ...editingRecipe, calories: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="airfryerCheck"
                checked={!!editingRecipe.isAirfryer}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, isAirfryer: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <label htmlFor="airfryerCheck" className="text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Im Airfryer zubereiten
              </label>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">Anleitung:</label>
              <textarea
                rows={3}
                value={editingRecipe.instructions}
                onChange={(e) => setEditingRecipe({ ...editingRecipe, instructions: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-800 text-sm">Zutaten:</h4>
                <button
                  onClick={addIngredientToEditing}
                  className="text-xs bg-teal-50 text-teal-700 font-bold px-3 py-1.5 rounded-xl border border-teal-200 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Hinzufügen
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {editingRecipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border text-xs">
                    <input
                      type="text"
                      value={ing.name}
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
                    <button onClick={() => removeIngredientFromEditing(idx)} className="p-1 text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <button
                onClick={() => deleteRecipe(editingRecipe.id)}
                className="px-4 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Löschen
              </button>

              <div className="flex items-center gap-3">
                <button onClick={() => setEditingRecipe(null)} className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-600">
                  Abbrechen
                </button>
                <button
                  onClick={() => saveRecipeChanges(editingRecipe)}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Speichern
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}