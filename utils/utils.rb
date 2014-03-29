
require 'axlsx'

class Song
  attr_accessor :index, :name, :category_big, :category_small, :first_sentence, :song_src, :pic_src
  def initialize(file)
    basename = File.basename(file)
    @index = basename.to_i
    @name = basename.slice(4, basename.index('.') - 4)
    @category_big = ''
    @category_small = ''
    @first_sentence = ''
    @song_src = basename.slice(0, basename.index('.')) + '.mp3'
    @pic_src = basename.slice(0, basename.index('.')) + '.jpg'
  end
end

class Resource
  attr_accessor :name, :file_name, :file_size, :file_type, :stars
  def initialize(file)
    basename = File.basename(file)
    @name = basename.slice(4, basename.index('.') - 4)
    @file_name = basename
    @file_size = File.size(file)
    
    ext_str = basename.slice(basename.index('.'), basename.length - basename.index('.'))
    file_type = ''
    if(ext_str == '.mp3')
      file_type = 'song'
    else
      file_type = 'pic'
    end
    @file_type = file_type
    
    @stars = 0
  end
end

def generate_excel_of_songs_from_folder(folder_path)

  p = Axlsx::Package.new
  p.use_shared_strings = true
  p.workbook do |wb|
    wb.add_worksheet(:name => 'Sheet1') do  |ws|
      ws.add_row ['首数', '歌名', '歌词首句', '大类', '小类', '歌曲文件', '歌谱文件']
      Dir.glob(folder_path + '/*.jpg') do |file|
        song = Song.new(file)
        ws.add_row [song.index, song.name, song.first_sentence, song.category_big, song.category_small, song.song_src, song.pic_src]
      end
    end
  end
  p.serialize '1050_songs_auto.xlsx'
  
end

def generate_excel_of_resources_from_folder(folder_path)

  p = Axlsx::Package.new
  p.use_shared_strings = true
  p.workbook do |wb|
    wb.add_worksheet(:name => 'Sheet1') do  |ws|
      ws.add_row ['歌名', '文件名', '文件大小', '文件类型']
      Dir.glob(folder_path + '/*.*') do |file|
        next if file == '.' or file == '..'
        basename = File.basename(file)
        ext_str = basename.slice(basename.index('.'), basename.length - basename.index('.'))
        if(ext_str == '.jpg' || ext_str == '.mp3')
          resource = Resource.new(file)
          ws.add_row [resource.name, resource.file_name, resource.file_size, resource.file_type]
        end
      end
    end
  end
  p.serialize '1050_resources_auto.xlsx'

end

def demo

  p = Axlsx::Package.new
   
  # Required for use with numbers
  p.use_shared_strings = true
   
  p.workbook do |wb|
    # define your regular styles
    styles = wb.styles
    title = styles.add_style :sz => 15, :b => true, :u => true
    default = styles.add_style :border => Axlsx::STYLE_THIN_BORDER
    pascal_colors = { :bg_color => '567DCC', :fg_color => 'FFFF00' }
    pascal = styles.add_style pascal_colors.merge({ :border => Axlsx::STYLE_THIN_BORDER, :b => true })
    header = styles.add_style :bg_color => '00', :fg_color => 'FF', :b => true
    money = styles.add_style :format_code => '#,###,##0', :border => Axlsx::STYLE_THIN_BORDER
    money_pascal = styles.add_style pascal_colors.merge({ :format_code => '#,###,##0', :border => Axlsx::STYLE_THIN_BORDER })
    percent = styles.add_style :num_fmt => Axlsx::NUM_FMT_PERCENT, :border => Axlsx::STYLE_THIN_BORDER
    percent_pascal = styles.add_style pascal_colors.merge({ :num_fmt => Axlsx::NUM_FMT_PERCENT, :border => Axlsx::STYLE_THIN_BORDER })
   
    wb.add_worksheet(:name => 'Data Bar Conditional Formatting') do  |ws|
      ws.add_row ['A$$le Q1 Revenue Historical Analysis (USD)'], :style => title
      ws.add_row
      ws.add_row ['Quarter', 'Profit', '% of Total'], :style => header
      # Passing one style applies the style to all columns
      ws.add_row ['Q1-2010', '15680000000', '=B4/SUM(B4:B7)'], :style => pascal
   
      # Otherwise you can specify a style for each column.
      ws.add_row ['Q1-2011', '26740000000', '=B5/SUM(B4:B7)'], :style => [pascal, money_pascal, percent_pascal]
      ws.add_row ['Q1-2012', '46330000000', '=B6/SUM(B4:B7)'], :style => [default, money, percent]
      ws.add_row ['Q1-2013(est)', '72230000000', '=B7/SUM(B4:B7)'], :style => [default, money, percent]
   
      # You can merge cells!
      ws.merge_cells 'A1:C1'
   
    end
  end
  p.serialize 'getting_barred.xlsx'

end

def main
  if(ARGV.length == 1)
    folder_path = ARGV[0]
  end
  generate_excel_of_songs_from_folder(folder_path)
  generate_excel_of_resources_from_folder(folder_path)
end

main()