import { useEffect, useState } from 'react'
import {
  getRecommendations,
  localStorageParser,
  supabaseClient,
} from '../../utils/supabase'
import { definitions } from '../../types/supabase'

export const useRecs = (title: string) => {
  const [recs, setRecs] = useState<definitions['recommendations'][] | null>(
    null,
  )
  const [currentRec, setCurrentRec] = useState<
    definitions['recommendations'] | null
  >(null)

  const handleNewRecs = (recs: definitions['recommendations'][]) => {
    const [first, ...rest] = recs
    setCurrentRec(first)
    setRecs(rest)
    localStorageParser.setItem(`unboringRecs-${title}`, rest)
  }

  const recsLoader = async () => {
    const recommendations = await getRecommendations(
      title.toLowerCase(),
      currentRec
        ? currentRec.id
        : Number(
            window.localStorage.getItem(`unboringRecs-lastSeenId-${title}`),
          ),
    )
    handleNewRecs(recommendations)
  }

  useEffect(() => {
    const recommendations = localStorageParser.getItem(`unboringRecs-${title}`)
    if (recommendations.length) {
      handleNewRecs(recommendations)
    } else recsLoader()
  }, [])

  useEffect(() => {
    if (currentRec) {
      window.localStorage.setItem(
        `unboringRecs-lastSeenId-${title}`,
        currentRec.id.toString(),
      )
    }
  }, [currentRec])

  const handleClick = async (
    event?: 'increment_clicks' | 'increment_downvotes',
  ) => {
    if (event && currentRec) {
      // Increment in DB
      const { error } = await supabaseClient.rpc(event, {
        rec_id: currentRec.id,
      })
      if (error) console.log(error)
    }
    // Remove & replace currentRec with new one
    if (recs.length) {
      handleNewRecs(recs.slice(1))
    }
    // If last item in array -> load more recs into local storage
    else recsLoader()
  }

  return {
    currentRec,
    handleClick,
    isLoading: !recs,
  }
}
