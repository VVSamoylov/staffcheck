package ru.tvsamara.staff.Util;

import java.util.Objects;

public class  Pair<V, A> {
    private V value;
    private A alarm;

    public Pair(V value, A alarm) {
        this.value = value;
        this.alarm = alarm;
    }

    public V getValue() {
        return value;
    }

    public void setValue(V value) {
        this.value = value;
    }

    public A getAlarm() {
        return alarm;
    }

    public void setAlarm(A alarm) {
        this.alarm = alarm;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Pair<?, ?> pair)) return false;
        return Objects.equals(value, pair.value) && Objects.equals(alarm, pair.alarm);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value, alarm);
    }
}
