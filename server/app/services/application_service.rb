class ApplicationService
  private

  def format_date date_time
    cur_time = date_time.in_time_zone
    if cur_time > Settings.time.future.year.seconds.from_now || cur_time < Settings.time.ago.years.seconds.ago
      return nil
    end

    cur_time
  rescue ArgumentError
    nil
  end
end
