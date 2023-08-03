const Genres = require('./genres')
const data = [
    'Комедии', 
    'Мультфильмы',
    'Ужасы',
    'Фантастика',
    'Триллеры',
    'Боевики',
    'Мелодрамы',
    'Детективы',
    'Приключения',
    'Фэнтези'
]
async function writeDataGenre(){
    const length = await Genres.count();
    if(length ==0){
        data.map((item, index)=>{
            new Genres({
                name: item,
                key: index
            }).save()
        })
    }
}
module.exports = writeDataGenre