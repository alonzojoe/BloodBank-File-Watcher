const Header = ({ isOn }: { isOn: boolean }): JSX.Element => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-semibold py-3">Blood Bank File Watcher </h2>

      <label className="inline-flex items-center pointer-events-none ">
        <input
          className="cursor-pointer sr-only peer"
          type="checkbox"
          data-true-value={true}
          data-false-value={false}
          onChange={() => {}}
          checked={isOn}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none ring-0 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary dark:peer-checked:bg-primary"></div>
      </label>
    </div>
  )
}

export default Header
