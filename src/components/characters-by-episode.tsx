import { getRouteApi } from "@tanstack/react-router"

const getCharacterImage = (url: string) => {
    const characterId = url.split("/").pop()
    return "https://rickandmortyapi.com/api/character/avatar/"+characterId+".jpeg"
}

const paramsRouterApi = getRouteApi("/character/$id/$episode")

export default function CharactersByEpisode({ characters }: { characters: string[] }) {

  const { episode } = paramsRouterApi.useParams()   

  return (
    <article className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold underline">Characters from EP {episode}</h2>
    <div className="flex gap-1 flex-wrap">
        {characters.map(character => 
            <img src={getCharacterImage(character) } alt={character} className="size-20"/>
        )}
    </div>
    </article>
  )
}