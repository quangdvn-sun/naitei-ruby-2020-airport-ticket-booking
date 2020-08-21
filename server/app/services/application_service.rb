class ApplicationService
  private

  def format_date date_time
    cur_time = date_time.in_time_zone
    return if cur_time > Settings.time.future.year.seconds.from_now || cur_time < Settings.time.past.years.seconds.ago

    cur_time
  rescue ArgumentError
    nil
  end
end
