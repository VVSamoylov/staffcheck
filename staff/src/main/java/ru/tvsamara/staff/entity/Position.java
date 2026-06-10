package ru.tvsamara.staff.entity;

import jakarta.persistence.*;

import java.util.Objects;

/**
 * Должность
 * @author venia
 */
@Entity
@Table(name="position")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    @Column(unique = true)
    private String posName;

    public String getPosName() {
        return posName;
    }

    public void setPosName(String posName) {
        this.posName = posName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Position position)) return false;
        return Objects.equals(id, position.id)
            && Objects.equals(posName, position.posName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, posName);
    }
}
