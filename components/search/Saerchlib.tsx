'use client'

import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import MultipleSelector, { Option } from '@/components/ui/multiselect'

type Props = {
  onChange: (values: Option[]) => void
}

const Saerchlib = ({ onChange }: Props) => {
  const [options, setOptions] = useState<Option[]>([])
  const [selected, setSelected] = useState<Option[]>([])

  useEffect(() => {
    const fetchTitles = async () => {
      const res = await fetch('/api/bibliotheque/titres')
      const data = await res.json()
      console.log("✅ Titres récupérés :", data) // Debug
      setOptions(data)
    }

    fetchTitles()
  }, [])

  const handleChange = (newSelected: Option[]) => {
    console.log("🎯 Valeurs sélectionnées :", newSelected) // Debug
    setSelected(newSelected)
    onChange(newSelected)
  }

return (
  <div className="*:not-first:mt-2">
    <Label>Recherchez parmi des milliers de tutoriels</Label>
    <MultipleSelector
      value={selected} // Use value instead of selected
      onChange={handleChange}
      defaultOptions={options}
      placeholder="Recherchez vos tutoriels préférés ..."
      commandProps={{
        label: "Recherchez vos tutoriels préférés ...",
      }}
      className='rounded'
      emptyIndicator={<p className="text-center text-sm">Aucun résultat trouvé</p>}
    />
  </div>
)
}

export default Saerchlib