export const updateCardFilters = (cardList, filters) => {
        return cardList?.map( item => {
            if(item.char_id === filters.char_id){
                return { 
                    ...item,
                    filters: true,
                    saturation: filters.saturation,
                    blur: filters.blur,
                    brightness: filters.brightness,
                    contrast: filters.contrast
                }
            }
            return item
        })
}

export const deleteCard = (cardList, currentItem) => {
    return cardList.filter(item => {
        return item.char_id !== currentItem.char_id
    });
}

export const replaceImage = (cardList, replaceFrom, replaceTo) => {
        return cardList?.map( item => {
            if(item.char_id === replaceFrom.char_id){
                return { 
                    ...item,
                    char_id: replaceTo.char_id,
                    img: replaceTo.img
                }
            }
            return item
        })
}