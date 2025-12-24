
const getCharacterImage = (url: string) => {
    const characterId = url.split("/").pop()
    return "https://rickandmortyapi.com/api/character/avatar/"+characterId+".jpeg"
}

export default function CharactersByEpisode({ characters }: { characters: string[] }) {
    
  return (
    <article className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold underline">Characters</h2>
    <div className="flex gap-1 flex-wrap">
        {characters.map(character => 
            <img src={getCharacterImage(character) } alt={character} className="size-20"/>
        )}
    </div>
    </article>
  )
}