import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

export const useCharacterStore = defineStore('character', () => {
  const userStore = useUserStore()


  const outfits = {
    default: { name: 'Стандартный образ', price: 0 },
    sporty: { name: 'Спортивный образ', price: 100 },
    professional: { name: 'Профессиональный образ', price: 200 },
    elite: { name: 'Элитный образ', price: 500 },
  }

  const accessories = {
    headband: { name: 'Повязка на голову', price: 50 },
    waterbottle: { name: 'Бутылка с водой', price: 75 },
    smartwatch: { name: 'Фитнесс браслет', price: 150 },
    gymBag: { name: 'Спортивная сумка', price: 100 },
  }

  const characterProgress = ref({
    level: 1,
    physique: 'новичок',
    progressPercentage: 0,
  })

  const updatePhysique = () => {
    const points = userStore.profile.points
    if (points >= 1000) characterProgress.value.physique = 'элита'
    else if (points >= 500) characterProgress.value.physique = 'атлет'
    else if (points >= 200) characterProgress.value.physique = 'занимающийся'
    else characterProgress.value.physique = 'новичок'
  }

  const purchaseOutfit = (outfitId: string) => {
    const outfit = outfits[outfitId]
    if (!outfit) return false

    if (userStore.profile.points >= outfit.price) {
      userStore.profile.points -= outfit.price
      userStore.profile.character.outfit = outfitId
      return true
    }
    return false
  }

  const purchaseAccessory = (accessoryId: string) => {
    const accessory = accessories[accessoryId]
    if (!accessory) return false

    if (userStore.profile.points >= accessory.price) {
      userStore.profile.points -= accessory.price
      userStore.profile.character.accessories.push(accessoryId)
      return true
    }
    return false
  }

  return {
    characterProgress,
    outfits,
    accessories,
    updatePhysique,
    purchaseOutfit,
    purchaseAccessory,
  }
})
