import { useRef, useState } from "react";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import CloseIcon from '@mui/icons-material/Close';

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedStep1, setSelectedStep1] = useState(null);
  const [selectedStep2, setSelectedStep2] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tagsVisible, setTagsVisible] = useState(false);

  const inputRef = useRef(null);

  const tagsStep1 = ["所在地", "勤務地", "職類", "従業員数", "新規案件/旧案件"];
  const tagsStep2 = {
    "所在地": ["東京", "神奈川", "千葉", "埼玉"],
    "勤務地": ["本社", "支社", "工場"],
    "職類": ["ITコンサルタント・システムコンサルタント", "プリセールス", "業務系アプリケーションエンジニア・プログラマ"],
    "従業員数": ["10-50", "51-200", "201-500", "500+"],
    "新規案件/旧案件": ["新規案件","旧案件"],
  };

  const handleTagSelectionStep1 = (tag) => {
    if (selectedStep1 !== tag) {
      setSelectedStep1(tag);
      setSelectedStep2([]);
    } else {
      setSelectedStep1(null);
      setSelectedStep2([]);
    }
  };

  const handleTagSelectionStep2 = (tag) => {
    if (!selectedStep2.includes(tag)) {
      setSelectedStep2([...selectedStep2, tag]);
    } else {
      setSelectedStep2(selectedStep2.filter((i) => i !== tag));
    }
  };

  const filteredTags = (tags) =>
    tags.filter((item) =>
      item.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim())
    );

  const handleSearchButtonClick = () => {
    setTagsVisible(true);
    setMenuOpen(false); // Close menu when search button is clicked
  };

  const handleCloseTags = () => {
    setTagsVisible(false);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  // Prepare tags to be displayed in the tags section
  const tagsToShow = [...(selectedStep1 ? [selectedStep1] : []), ...selectedStep2];

  return (
    <div className="relative bg-[#eef1f8] h-screen grid place-items-center w-full">
      {/* Tags Display (above the filter button) */}
      {tagsVisible && tagsToShow.length > 0 && (
        <div className={`absolute top-12 left-0 w-full max-w-xs bg-white border border-gray-300 shadow-lg z-20 p-2 transition-opacity duration-300 ease-in-out ${tagsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%]'}`}>
          <div className="relative flex w-full ">
            <ul className="flex flex-wrap gap-3">
              {tagsToShow.map((tag) => (
                <li
                  key={tag}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  {tag}
                  <button
                    className="bg-transparent  p-2 transition-colors duration-300 ease-in-out hover:text-red-700"
                    onClick={() => {
                      selectedStep1 === tag
                        ? handleTagSelectionStep1(tag)
                        : handleTagSelectionStep2(tag);
                    }}
                  >
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="absolute top-2 right-2 bg-transparent text-green-600 p-1 rounded-full transition-colors duration-300 ease-in-out hover:text-red-700"
              onClick={handleCloseTags}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}

      {/* Filter Button */}
      <button
        ref={inputRef}
        className="w-10 h-8 px-3 flex items-center justify-center text-white border rounded-md bg-slate-200 focus:outline-none transition-transform duration-300 ease-in-out hover:bg-slate-300"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <FilterAltRoundedIcon />
      </button>

      {/* Filter Menu */}
      {menuOpen && (
       
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-30">
            { /* this div is main div */}
          <div 
          className={
            `relative flex flex-col items-center justify-between gap-3 bg-white w-[610px] h-[370px] py-10 px-8 border border-gray-300 shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out ${menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <button
              className="absolute top-2 right-3 p-1 "
              onClick={handleCloseMenu}
            >
              <CloseIcon />
            </button>
            <div className="flex justify-between w-full">
              <h3 className="font-medium text-xl">職種を絞り込む</h3>
              <p>この条件の求人数 <span className="text-red-600 text-xl">0</span> 件</p>
            </div>
            <div className="flex gap-4">
              {/* Div 1: Tags Step 1 */}
              <div className="w-[260px] max-h-64 p-4 flex flex-col overflow-y-auto bg-blue-50 border border-blue-300 rounded-md">
                <h3 className="text-lg font-semibold">Step 1</h3>
                <ul className="w-full">
                  {filteredTags(tagsStep1).map((tag) => (
                    <li
                      key={tag}
                      className="p-2 flex items-center gap-2 cursor-pointer hover:bg-blue-200 rounded-md transition-colors duration-300 ease-in-out"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleTagSelectionStep1(tag)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStep1 === tag}
                        readOnly
                        className="transition-colors duration-300 ease-in-out"
                      />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Div 2: Tags Step 2 (Shown to the right of Div 1) */}
              {selectedStep1 && (
                <div className="w-[260px] max-h-64 p-4 flex flex-col overflow-y-auto bg-slate-100 border border-green-300 rounded-md">
                  <h3 className="text-lg font-semibold">Step 2</h3>
                  <ul className="w-full">
                    {filteredTags(tagsStep2[selectedStep1] || []).map((tag) => (
                      <li
                        key={tag}
                        className="p-2 flex items-center gap-2 cursor-pointer hover:bg-green-200 rounded-md transition-colors duration-300 ease-in-out"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleTagSelectionStep2(tag)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedStep2.includes(tag)}
                          readOnly
                          className="transition-colors duration-300 ease-in-out"
                        />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Search Button */}
            
              <button
                className="w-[220px] h-[32px] bg-blue-500 text-white px-8 rounded-md transition-transform duration-300 ease-in-out hover:bg-blue-600"
                onClick={handleSearchButtonClick}
              >
                この条件で検索する
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
