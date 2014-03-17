require 'roo'

def readExcel
  s = Roo::Excelx.new("utils/1050.xlsx")
  s.default_sheet = s.sheets.first
  puts s.info
end

def convertExcelToList

end

readExcel()


