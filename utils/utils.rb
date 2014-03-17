require 'roo'
require 'mysql'
require 'yaml'

def readDatabaseConfig
  config = YAML.load_file('config/database.yml')
  config.to_hash
end

def connectDatabase(config)

  env = 'development'
  if(ARGV.length == 1)
    env = ARGV[0]
  end
  
  @init = Mysql.init
  @init.options(Mysql::SET_CHARSET_NAME, "utf8")
  @m = @init.real_connect(config[env]['host'], config[env]['username'], config[env]['password'], config[env]['database'])
  
  importSongsFromExcel(@m)
  
  @init.close
  
end

def readExcel(path)
  s = Roo::Excelx.new(path)
  s.default_sheet = s.sheets.first
  s
end

def convertExcelToList(s, attr_array)
  list = []
  2.upto(s.last_row) do |row|
    obj = {}
    attr_array.length.times do |i|
      obj[attr_array[i]] = (s.cell(row, i+1)).to_s
    end
    list.push(obj)
  end
  list
end

def importSongsFromExcel(mysql_connection)

  attr_array = ['index', 'name', 'first_sentence', 'category_big', 'category_small', 'song_src', 'pic_src']
  s = readExcel('utils/1050.xlsx')
  list = convertExcelToList(s, attr_array)
  
  list.each do |obj|
    song = mysql_connection.query("select id from songs where `index` = #{obj['index'].to_i} ")
    if(song.num_rows == 0)
      song_src = obj['song_src'] == '' ? 'NULL' : "'#{obj['song_src']}'"
      pic_src = obj['pic_src'] == '' ? 'NULL' : "'#{obj['pic_src']}'"
      sql = "insert into songs (`index`, name, first_sentence, category_big, category_small, song_src, pic_src, created_at, updated_at) values ( #{obj['index'].to_i}, '#{obj['name']}', '#{obj['first_sentence']}', '#{obj['category_big']}', '#{obj['category_small']}', #{song_src}, #{pic_src}, now(), now() )"
      mysql_connection.query(sql)
    end
  end
  
end

def connect
  connectDatabase(readDatabaseConfig())
end

connect() # Need to change it to `yield` in the future.  
